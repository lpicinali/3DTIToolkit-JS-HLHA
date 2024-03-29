import { all, call, put, select, take } from 'redux-saga/effects'
import { get, reduce, some, values } from 'lodash'

import {
  ActionType,
  Ear,
  HearingLossGrade,
  PlaybackState,
  PromptStatus,
  SonicComponent,
} from 'src/constants.js'
import { cast } from 'src/utils.js'
import { setDirectionalityValue } from 'src/actions/controls.actions.js'
import {
  setHaEnabled,
  setHaGrade,
  setHaLinked,
} from 'src/actions/ha.actions.js'
import {
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
  setHlGrade,
  setHlEnabled,
} from 'src/actions/hl.actions.js'
import { addPrompt } from 'src/actions/prompter.actions.js'
import { getFileUrl } from 'src/audio/audio-files.js'
import {
  setMaskNode,
  setTargetNode,
  stopMaskNodes,
  stopTargetNode,
} from 'src/audio/chain.js'
import * as engine from 'src/audio/engine.js'
import {
  setEnabled as setHearingAidEnabled,
  setQuantisationStepEnabled,
} from 'src/audio/hearingAidProcessor.js'
import { setEnabled as setHearingLossEnabled } from 'src/audio/hearingLossProcessor.js'

/**
 * Helpers
 */

function* promptToResolveUnsafeAction() {
  const prompt = {
    text:
      `You are about to apply Hearing Aid settings that are more "aggressive" than their Heaing Loss counterparts. This action might result in very loud audio levels, which can cause damage to your hearing, especially if you are wearing headphones.` +
      `\n\n` +
      `We strongly recommend that you always keep Hearing Aid Simulator settings at a lower level or grade than the Hearing Loss Simulator.` +
      `\n\n` +
      `What do you want to do?`,
    rejectLabel: `Stay safe and go back`,
    resolveLabel: `Proceed, I know what I'm doing`,
  }
  yield put(addPrompt(prompt))
}

/**
 * Sagas
 */

function* applyPlayPause() {
  while (true) {
    const {
      payload: { state },
    } = yield take(ActionType.SET_PLAYBACK_STATE)

    if (state === PlaybackState.PLAYING) {
      engine.play()
    } else if (state === PlaybackState.PAUSED) {
      engine.pause()
    }
  }
}

function* applyComponentSource() {
  // Load initial sources
  const [targetState, maskingState] = yield all([
    select(state => state.target),
    select(state => state.masking),
  ])

  yield call(engine.setTargetSource, getFileUrl(targetState.selected))
  yield call(engine.setMaskSource, {
    [Ear.LEFT]: getFileUrl(
      maskingState.masks[maskingState.selected].filename[Ear.LEFT]
    ),
    [Ear.RIGHT]: getFileUrl(
      maskingState.masks[maskingState.selected].filename[Ear.RIGHT]
    ),
  })

  // Listen to changes
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_TARGET,
      ActionType.SET_MASK,
    ])

    if (type === ActionType.SET_TARGET) {
      if (payload.target === null) {
        yield call(stopTargetNode)
        yield call(setTargetNode, null)
      } else {
        yield call(engine.setTargetSource, getFileUrl(payload.target))
      }
    } else if (type === ActionType.SET_MASK) {
      if (payload.mask === null) {
        yield call(stopMaskNodes)
        yield call(setMaskNode, null, Ear.LEFT)
        yield call(setMaskNode, null, Ear.RIGHT)
      } else {
        const maskFilenames = yield select(state =>
          get(state, ['masking', 'masks', payload.mask, 'filename'])
        )
        const maskUrls = reduce(
          maskFilenames,
          (aggr, filename, channel) => ({
            ...aggr,
            [channel]: getFileUrl(filename),
          }),
          {}
        )
        yield call(engine.setMaskSource, maskUrls)
      }
    }

    if (
      (type === ActionType.SET_TARGET && payload.target !== null) ||
      (type === ActionType.SET_MASK && payload.mask !== null)
    ) {
      const playbackState = yield select(state => state.controls.playbackState)
      if (playbackState === PlaybackState.PLAYING) {
        yield call(engine.play)
      }
    }
  }
}

function* applyComponentVolume() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_TARGET_VOLUME,
      ActionType.SET_MASK_VOLUME,
    ])

    const componentId =
      type === ActionType.SET_TARGET_VOLUME
        ? SonicComponent.TARGET
        : SonicComponent.MASK

    engine.setComponentVolume(componentId, payload.volume)
  }
}

function* applyPerformanceMode() {
  while (true) {
    const { payload } = yield take(ActionType.SET_PERFORMANE_MODE_ENABLED)
    engine.setPerformanceModeEnabled(payload.isEnabled)
  }
}

function* applyHeadRadius() {
  while (true) {
    const { payload } = yield take(ActionType.SET_HEAD_RADIUS)
    engine.setHeadRadius(payload.radius)
  }
}

function* applyDirectionalityEnabled() {
  while (true) {
    const { payload } = yield take(ActionType.SET_DIRECTIONALITY_ENABLED)
    engine.setDirectionalityEnabled(payload.isEnabled)
  }
}

function* applyDirectionalityAttenuation() {
  while (true) {
    const { payload } = yield take(ActionType.SET_DIRECTIONALITY_VALUE)
    const attenuation = cast(payload.value, -1, 1, 0, 30)
    engine.setDirectionalityAttenuation(payload.ear, attenuation)
  }
}

function* applyHearingLossSimulatorEnabled() {
  while (true) {
    const { payload } = yield take(ActionType.SET_HL_ENABLED)
    const hearingAidState = yield select(state => state.ha)

    const isUnsafeDisableHlAction =
      payload.isEnabled === false &&
      hearingAidState.isEnabled === true &&
      some(hearingAidState.grade, grade => grade !== HearingLossGrade.NONE)

    if (isUnsafeDisableHlAction === true) {
      yield call(promptToResolveUnsafeAction)
      const {
        payload: { status },
      } = yield take(ActionType.RESOLVE_PROMPT)

      if (status === PromptStatus.REJECTED) {
        yield put(setHlEnabled(!payload.isEnabled))
      } else {
        yield call(setHearingLossEnabled, payload.isEnabled)
      }
    } else {
      yield call(setHearingLossEnabled, payload.isEnabled)
    }
  }
}

function* applyHearingAidSimulatorEnabled() {
  while (true) {
    const { payload } = yield take(ActionType.SET_HA_ENABLED)

    const hearingLossState = yield select(state => state.hl)
    const isUnsafeEnableHaAction =
      payload.isEnabled === true && hearingLossState.isEnabled === false

    let shouldToggleHearingAid = false

    if (isUnsafeEnableHaAction === true) {
      yield call(promptToResolveUnsafeAction)
      const {
        payload: { status },
      } = yield take(ActionType.RESOLVE_PROMPT)

      if (status === PromptStatus.REJECTED) {
        yield put(setHaEnabled(!payload.isEnabled))
      } else {
        shouldToggleHearingAid = true
      }
    } else {
      shouldToggleHearingAid = true
    }

    if (shouldToggleHearingAid === true) {
      yield call(setHearingAidEnabled, payload.isEnabled)

      // Toggle directionality accordingly, since this is part of the same
      // fronted module in the UI
      const isDirectionalityEnabled = yield select(
        state => state.controls.isDirectionalityEnabled
      )
      yield call(
        engine.setDirectionalityEnabled,
        isDirectionalityEnabled && payload.isEnabled
      )
    }
  }
}

function* applySimulatorPresets() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_HL_GRADE,
      ActionType.SET_HA_GRADE,
    ])

    if (type === ActionType.SET_HL_GRADE) {
      engine.setHearingLossPreset(payload.ear, payload.grade)
    } else if (type === ActionType.SET_HA_GRADE) {
      yield call(engine.setHearingAidPreset, payload.ear, payload.grade)
    }
  }
}

function* applyTargetPosition() {
  while (true) {
    const { payload } = yield take(ActionType.SET_TARGET_POSITION)
    const { azimuth, distance } = payload.position
    const elevation = yield select(state => state.controls.targetElevation)

    yield call(engine.setComponentPosition, SonicComponent.TARGET, {
      azimuth,
      distance,
      elevation,
    })
  }
}

function* applyTargetElevation() {
  while (true) {
    const {
      payload: { elevation },
    } = yield take(ActionType.SET_TARGET_ELEVATION)
    const { azimuth, distance } = yield select(
      state => state.controls.targetPosition
    )

    yield call(engine.setComponentPosition, SonicComponent.TARGET, {
      azimuth,
      distance,
      elevation,
    })
  }
}

function* applyFrequencySmearingPresets() {
  while (true) {
    const {
      payload: { ear, preset },
    } = yield take(ActionType.SET_HL_FREQUENCY_SMEARING_PRESET)
    yield call(engine.setFrequencySmearingPreset, ear, preset)
  }
}

function* applyTemporalDistortionPresets() {
  while (true) {
    const {
      payload: { ear, preset },
    } = yield take(ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET)
    yield call(engine.setTemporalDistortionPreset, ear, preset)
  }
}

function* mirrorLinkedHearingLossSettings() {
  while (true) {
    const { type, payload, isPresetEffect } = yield take([
      ActionType.SET_HL_LINKED,
      ActionType.SET_HL_GRADE,
      ActionType.SET_HL_FREQUENCY_SMEARING_PRESET,
      ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET,
    ])

    if (isPresetEffect !== true) {
      const hearingLossState = yield select(state => state.hl)

      if (type === ActionType.SET_HL_LINKED && payload.isLinked === true) {
        yield put(setHlGrade(Ear.RIGHT, hearingLossState.grade[Ear.LEFT]))
        yield put(
          setFrequencySmearingPreset(
            Ear.RIGHT,
            hearingLossState.frequencySmearingPreset[Ear.LEFT]
          )
        )
        yield put(
          setTemporalDistortionPreset(
            Ear.RIGHT,
            hearingLossState.temporalDistortionPreset[Ear.LEFT]
          )
        )
      } else if (
        hearingLossState.isLinked === true &&
        payload.ear === Ear.LEFT
      ) {
        if (type === ActionType.SET_HL_GRADE) {
          yield put(setHlGrade(Ear.RIGHT, payload.grade))
        } else if (type === ActionType.SET_HL_FREQUENCY_SMEARING_PRESET) {
          yield put(setFrequencySmearingPreset(Ear.RIGHT, payload.preset))
        } else if (type === ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET) {
          yield put(setTemporalDistortionPreset(Ear.RIGHT, payload.preset))
        }
      } else if (
        type === ActionType.SET_HL_LINKED &&
        payload.isLinked === false
      ) {
        // Disable linking of HA when linking of HL is turned off.
        // This prevents most scenarios where hearing aid settings
        // would cause loud audio levels.
        const isHearingAidLinked = yield select(state => state.ha.isLinked)
        if (isHearingAidLinked === true) {
          yield put(setHaLinked(false))
        }
      }
    }
  }
}

function* applyQuantisationStepEnabled() {
  while (true) {
    const {
      payload: { step, isEnabled },
    } = yield take(ActionType.SET_QUANTISATION_STEP_ENABLED)
    yield call(setQuantisationStepEnabled, step, isEnabled)
  }
}

function* applyAidNoiseBits() {
  while (true) {
    const {
      payload: { numBits },
    } = yield take(ActionType.SET_HA_NUM_NOISE_BITS)

    yield call(engine.setHearingAidNumNoiseBits, numBits)
  }
}

function* mirrorLinkedHearingAidSettings() {
  while (true) {
    const { type, payload, isPresetEffect } = yield take([
      ActionType.SET_HA_LINKED,
      ActionType.SET_HA_GRADE,
      ActionType.SET_DIRECTIONALITY_VALUE,
    ])

    if (isPresetEffect !== true) {
      const [hearingAidState, controlsState] = yield all([
        select(state => state.ha),
        select(state => state.controls),
      ])

      if (type === ActionType.SET_HA_LINKED && payload.isLinked === true) {
        yield put(setHaGrade(Ear.RIGHT, hearingAidState.grade[Ear.LEFT]))
        yield put(
          setDirectionalityValue(
            Ear.RIGHT,
            controlsState.directionalityValue[Ear.LEFT]
          )
        )
      } else if (
        hearingAidState.isLinked === true &&
        payload.ear === Ear.LEFT
      ) {
        if (type === ActionType.SET_HA_GRADE) {
          yield put(setHaGrade(Ear.RIGHT, payload.grade))
        } else if (type === ActionType.SET_DIRECTIONALITY_VALUE) {
          yield put(setDirectionalityValue(Ear.RIGHT, payload.value))
        }
      }
    }
  }
}

function* makeAidFollowLoss() {
  while (true) {
    const action = yield take(ActionType.SET_HL_GRADE)
    const {
      payload: { ear, grade },
      isPresetEffect,
    } = action

    if (isPresetEffect !== true) {
      const allGrades = values(HearingLossGrade)
      const currentAidPreset = yield select(state => state.ha.grade[ear])
      if (allGrades.indexOf(grade) < allGrades.indexOf(currentAidPreset)) {
        yield put(setHaGrade(ear, grade))
      }
    }
  }
}

export default function* audioEngineSagas() {
  yield all([
    applyPlayPause(),
    applyComponentSource(),
    applyComponentVolume(),
    applyPerformanceMode(),
    applyHeadRadius(),
    applyDirectionalityEnabled(),
    applyDirectionalityAttenuation(),
    applyHearingLossSimulatorEnabled(),
    applyHearingAidSimulatorEnabled(),
    applySimulatorPresets(),
    applyTargetPosition(),
    applyTargetElevation(),
    applyFrequencySmearingPresets(),
    applyTemporalDistortionPresets(),
    mirrorLinkedHearingLossSettings(),
    applyQuantisationStepEnabled(),
    applyAidNoiseBits(),
    mirrorLinkedHearingAidSettings(),
    makeAidFollowLoss(),
  ])
}
