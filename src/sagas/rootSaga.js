import { all, call, put, select, take } from 'redux-saga/effects'
import { get, reduce, values } from 'lodash'

import {
  ActionType,
  Ear,
  HearingLossGrade,
  PlaybackState,
  SonicComponent,
} from 'src/constants.js'
import { cast } from 'src/utils.js'
import { setDirectionalityValue } from 'src/actions/controls.actions.js'
import { setHaGrade } from 'src/actions/ha.actions.js'
import {
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
  setHlGrade,
} from 'src/actions/hl.actions.js'
import { getFileUrl } from 'src/audio/audio-files.js'
import {
  setMaskNode,
  setTargetNode,
  stopMaskNodes,
  stopTargetNode,
} from 'src/audio/chain.js'
import * as engine from 'src/audio/engine.js'
import { setQuantisationStepEnabled } from 'src/audio/hearingAidProcessor.js'

function* applyPlayPause() {
  while (true) {
    const { payload: { state } } = yield take(ActionType.SET_PLAYBACK_STATE)

    if (state === PlaybackState.PLAYING) {
      engine.play()
    } else if (state === PlaybackState.PAUSED) {
      engine.pause()
    }
  }
}

function* applyComponentSource() {
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

function* toggleDirectionalityEnabledFromHearingAidPreset() {
  while (true) {
    const { payload } = yield take(ActionType.SET_HA_GRADE)
    if (payload.grade === HearingLossGrade.NONE) {
      yield call(engine.setDirectionalityEnabled, false)
    } else {
      const isEnabled = yield select(
        state => state.controls.isDirectionalityEnabled
      )
      yield call(engine.setDirectionalityEnabled, isEnabled)
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
      engine.setHearingAidPreset(payload.ear, payload.grade)
    }
  }
}

function* applyTargetPosition() {
  while (true) {
    const { payload } = yield take(ActionType.SET_TARGET_POSITION)
    const { azimuth, distance } = payload.position

    engine.setComponentPosition(SonicComponent.TARGET, { azimuth, distance })
  }
}

function* applyFrequencySmearingPresets() {
  while (true) {
    const { payload: { ear, preset } } = yield take(
      ActionType.SET_HL_FREQUENCY_SMEARING_PRESET
    )
    yield call(engine.setFrequencySmearingPreset, ear, preset)
  }
}

function* applyTemporalDistortionPresets() {
  while (true) {
    const { payload: { ear, preset } } = yield take(
      ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET
    )
    yield call(engine.setTemporalDistortionPreset, ear, preset)
  }
}

function* mirrorLinkedHearingLossSettings() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_HL_LINKED,
      ActionType.SET_HL_GRADE,
      ActionType.SET_HL_FREQUENCY_SMEARING_PRESET,
      ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET,
    ])

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
    } else if (hearingLossState.isLinked === true && payload.ear === Ear.LEFT) {
      if (type === ActionType.SET_HL_GRADE) {
        yield put(setHlGrade(Ear.RIGHT, payload.grade))
      } else if (type === ActionType.SET_HL_FREQUENCY_SMEARING_PRESET) {
        yield put(setFrequencySmearingPreset(Ear.RIGHT, payload.preset))
      } else if (type === ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET) {
        yield put(setTemporalDistortionPreset(Ear.RIGHT, payload.preset))
      }
    }
  }
}

function* applyQuantisationStepEnabled() {
  while (true) {
    const { payload: { step, isEnabled } } = yield take(
      ActionType.SET_QUANTISATION_STEP_ENABLED
    )
    yield call(setQuantisationStepEnabled, step, isEnabled)
  }
}

function* applyAidNoiseBits() {
  while (true) {
    const { payload: { numBits } } = yield take(
      ActionType.SET_HA_NUM_NOISE_BITS
    )

    yield call(engine.setHearingAidNumNoiseBits, numBits)
  }
}

function* mirrorLinkedHearingAidSettings() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_HA_LINKED,
      ActionType.SET_HA_GRADE,
      ActionType.SET_DIRECTIONALITY_VALUE,
    ])

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
    } else if (hearingAidState.isLinked === true && payload.ear === Ear.LEFT) {
      if (type === ActionType.SET_HA_GRADE) {
        yield put(setHaGrade(Ear.RIGHT, payload.grade))
      } else if (type === ActionType.SET_DIRECTIONALITY_VALUE) {
        yield put(setDirectionalityValue(Ear.RIGHT, payload.value))
      }
    }
  }
}

function* makeAidFollowLoss() {
  while (true) {
    const { payload: { ear, grade } } = yield take(ActionType.SET_HL_GRADE)

    const allGrades = values(HearingLossGrade)
    const currentAidPreset = yield select(state => state.ha.grade[ear])
    if (allGrades.indexOf(grade) < allGrades.indexOf(currentAidPreset)) {
      yield put(setHaGrade(ear, grade))
    }
  }
}

export default function* rootSaga() {
  yield [
    applyPlayPause(),
    applyComponentSource(),
    applyComponentVolume(),
    applyPerformanceMode(),
    applyHeadRadius(),
    applyDirectionalityEnabled(),
    applyDirectionalityAttenuation(),
    toggleDirectionalityEnabledFromHearingAidPreset(),
    applySimulatorPresets(),
    applyTargetPosition(),
    applyFrequencySmearingPresets(),
    applyTemporalDistortionPresets(),
    mirrorLinkedHearingLossSettings(),
    applyQuantisationStepEnabled(),
    applyAidNoiseBits(),
    mirrorLinkedHearingAidSettings(),
    makeAidFollowLoss(),
  ]
}
