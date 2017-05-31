import { ActionType, HearingLossGrade } from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: HearingLossGrade.NONE,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HL_GRADE) {
    return { ...state, grade: payload.grade }
  }

  return state
}
