import { set } from 'lodash/fp'

import {
  ActionType,
  Ear,
  HearingLossGrade,
  QuantisationStep,
} from 'src/constants.js'

const initialState = {
  isEnabled: true,
  isLinked: false,
  grade: {
    [Ear.LEFT]: HearingLossGrade.NONE,
    [Ear.RIGHT]: HearingLossGrade.NONE,
  },
  isQuantisationBeforeEnabled: false,
  isQuantisationAfterEnabled: false,
  numNoiseBits: 12,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HA_ENABLED) {
    return set('isEnabled', payload.isEnabled, state)
  }
  if (type === ActionType.SET_HA_LINKED) {
    return set('isLinked', payload.isLinked, state)
  }
  if (type === ActionType.SET_HA_GRADE) {
    return set(['grade', payload.ear], payload.grade, state)
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
