import { set } from 'lodash/fp'

import { ActionType, Ear, HearingLossGrade } from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: {
    [Ear.LEFT]: HearingLossGrade.NONE,
    [Ear.RIGHT]: HearingLossGrade.NONE,
  },
  frequencySmearingPreset: {
    [Ear.LEFT]: HearingLossGrade.NONE,
    [Ear.RIGHT]: HearingLossGrade.NONE,
  },
  temporalDistortionPreset: {
    [Ear.LEFT]: HearingLossGrade.NONE,
    [Ear.RIGHT]: HearingLossGrade.NONE,
  },
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HL_GRADE) {
    return set(['grade', payload.ear], payload.grade, state)
  }
  if (type === ActionType.SET_HL_FREQUENCY_SMEARING_PRESET) {
    return set(['frequencySmearingPreset', payload.ear], payload.preset, state)
  }
  if (type === ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET) {
    return set(['temporalDistortionPreset', payload.ear], payload.preset, state)
  }

  return state
}
