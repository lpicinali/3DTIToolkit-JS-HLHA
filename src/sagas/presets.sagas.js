import { all, put, take } from 'redux-saga/effects'

import {
  ActionType,
  Ear,
  GlobalPreset,
  HearingLossGrade,
  QuantisationStep,
} from 'src/constants.js'
import {
  setHaEnabled,
  setHaGrade,
  setQuantisationStepEnabled,
} from 'src/actions/ha.actions.js'
import {
  setHlEnabled,
  setHlGrade,
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
} from 'src/actions/hl.actions.js'
import { setGlobalPreset } from 'src/actions/presets.actions.js'

function markAsPresetEffect(action) {
  return {
    ...action,
    isPresetEffect: true,
  }
}

function* applyPresets() {
  while (true) {
    const { payload: { preset } } = yield take(ActionType.SET_GLOBAL_PRESET)

    if (preset === GlobalPreset.MILD_HEARING_LOSS) {
      yield put(markAsPresetEffect(setHlEnabled(true)))
      yield put(markAsPresetEffect(setHlGrade(Ear.LEFT, HearingLossGrade.MILD)))
      yield put(
        markAsPresetEffect(setHlGrade(Ear.RIGHT, HearingLossGrade.MILD))
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )

      yield put(markAsPresetEffect(setHaEnabled(false)))
    }

    if (preset === GlobalPreset.MONOLATERAL_MILD_HEARING_LOSS) {
      yield put(markAsPresetEffect(setHlEnabled(true)))
      yield put(markAsPresetEffect(setHlGrade(Ear.LEFT, HearingLossGrade.MILD)))
      yield put(
        markAsPresetEffect(setHlGrade(Ear.RIGHT, HearingLossGrade.NONE))
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )

      yield put(markAsPresetEffect(setHaEnabled(false)))
    }

    if (preset === GlobalPreset.MILD_HEARING_LOSS_WITH_HEARING_AID) {
      yield put(markAsPresetEffect(setHlEnabled(true)))
      yield put(markAsPresetEffect(setHlGrade(Ear.LEFT, HearingLossGrade.MILD)))
      yield put(
        markAsPresetEffect(setHlGrade(Ear.RIGHT, HearingLossGrade.MILD))
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.LEFT, HearingLossGrade.NONE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.RIGHT, HearingLossGrade.NONE)
        )
      )

      yield put(markAsPresetEffect(setHaEnabled(true)))
      yield put(markAsPresetEffect(setHaGrade(Ear.LEFT, HearingLossGrade.MILD)))
      yield put(
        markAsPresetEffect(setHaGrade(Ear.RIGHT, HearingLossGrade.MILD))
      )
      yield put(
        markAsPresetEffect(
          setQuantisationStepEnabled(QuantisationStep.BEFORE, false)
        )
      )
      yield put(
        markAsPresetEffect(
          setQuantisationStepEnabled(QuantisationStep.AFTER, false)
        )
      )
    }

    if (preset === GlobalPreset.SEVERE_HEARING_LOSS_WITH_DISTORTION) {
      yield put(markAsPresetEffect(setHlEnabled(true)))
      yield put(
        markAsPresetEffect(setHlGrade(Ear.LEFT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(setHlGrade(Ear.RIGHT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.LEFT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.RIGHT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.LEFT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.RIGHT, HearingLossGrade.MODERATE)
        )
      )

      yield put(markAsPresetEffect(setHaEnabled(false)))
    }

    if (
      preset ===
      GlobalPreset.SEVERE_HEARING_LOSS_WITH_DISTORTION_AND_HEARING_AID
    ) {
      yield put(markAsPresetEffect(setHlEnabled(true)))
      yield put(
        markAsPresetEffect(setHlGrade(Ear.LEFT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(setHlGrade(Ear.RIGHT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.LEFT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setFrequencySmearingPreset(Ear.RIGHT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.LEFT, HearingLossGrade.MODERATE)
        )
      )
      yield put(
        markAsPresetEffect(
          setTemporalDistortionPreset(Ear.RIGHT, HearingLossGrade.MODERATE)
        )
      )

      yield put(markAsPresetEffect(setHaEnabled(true)))
      yield put(
        markAsPresetEffect(setHaGrade(Ear.LEFT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(setHaGrade(Ear.RIGHT, HearingLossGrade.SEVERE))
      )
      yield put(
        markAsPresetEffect(
          setQuantisationStepEnabled(QuantisationStep.BEFORE, false)
        )
      )
      yield put(
        markAsPresetEffect(
          setQuantisationStepEnabled(QuantisationStep.AFTER, false)
        )
      )
    }
  }
}

function* resetPresetOnAnyChange() {
  while (true) {
    const action = yield take([
      ActionType.SET_HA_ENABLED,
      ActionType.SET_HA_LINKED,
      ActionType.SET_HA_GRADE,
      ActionType.SET_QUANTISATION_STEP_ENABLED,
      ActionType.SET_HL_ENABLED,
      ActionType.SET_HL_LINKED,
      ActionType.SET_HL_FREQUENCY_SMEARING_PRESET,
      ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET,
      ActionType.SET_HL_GRADE,
    ])

    if (action.isPresetEffect !== true) {
      yield put(setGlobalPreset(GlobalPreset.NONE))
    }
  }
}

export default function* presetsSagas() {
  yield all([applyPresets(), resetPresetOnAnyChange()])
}
