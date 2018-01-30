import {
  ActionType,
  HearingLossGrade,
  QuantisationStep,
} from 'src/constants.js'

const initialState = {
  isEnabled: false,
  grade: HearingLossGrade.NONE,
  isQuantisationBeforeEnabled: false,
  isQuantisationAfterEnabled: false,
  numNoiseBits: 12,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HA_GRADE) {
    return { ...state, grade: payload.grade }
  }
  if (type === ActionType.SET_QUANTISATION_STEP_ENABLED) {
    const key =
      payload.step === QuantisationStep.BEFORE
        ? 'isQuantisationBeforeEnabled'
        : 'isQuantisationAfterEnabled'
    return { ...state, [key]: payload.isEnabled }
  }
  if (type === ActionType.SET_HA_NUM_NOISE_BITS) {
    return { ...state, numNoiseBits: payload.numBits }
  }

  return state
}
