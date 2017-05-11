import { HearingLossGrade } from 'src/constants.js'

export default function createHalReducer(reducer) {
  const initialState = {
    isEnabled: false,
    grade: HearingLossGrade.NONE,
  }

  return function(state = initialState, action) {
    return reducer(state, action)
  }
}
