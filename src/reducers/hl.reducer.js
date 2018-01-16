import { ActionType, HearingLossGrade } from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: HearingLossGrade.NONE,
  isFrequencySmearingEnabled: false,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HL_GRADE) {
    return { ...state, grade: payload.grade }
  }
  if (type === ActionType.SET_HL_FREQUENCY_SMEARING_ENABLED) {
    return { ...state, isFrequencySmearingEnabled: payload.isEnabled }
  }

  return state
}
