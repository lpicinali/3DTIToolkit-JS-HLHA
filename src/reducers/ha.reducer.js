import { ActionType, HearingLossGrade } from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: HearingLossGrade.NONE,
  numNoiseBits: 8,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HA_GRADE) {
    return { ...state, grade: payload.grade }
  }
  if (type === ActionType.SET_HA_NUM_NOISE_BITS) {
    return { ...state, numNoiseBits: payload.numBits }
  }

  return state
}
