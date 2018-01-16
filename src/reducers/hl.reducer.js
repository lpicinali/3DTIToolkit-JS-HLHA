import { ActionType, HearingLossGrade } from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: HearingLossGrade.NONE,
  frequencySmearingPreset: HearingLossGrade.NONE,
  temporalDistortionPreset: HearingLossGrade.NONE,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HL_GRADE) {
    return { ...state, grade: payload.grade }
  }
  if (type === ActionType.SET_HL_FREQUENCY_SMEARING_PRESET) {
    return { ...state, frequencySmearingPreset: payload.preset }
  }
  if (type === ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET) {
    return { ...state, temporalDistortionPreset: payload.preset }
  }

  return state
}
