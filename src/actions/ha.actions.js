import { ActionType } from 'src/constants.js'

export const setHaGrade = grade => ({
  type: ActionType.SET_HA_GRADE,
  payload: { grade },
})

export const setHaNumNoiseBits = numBits => ({
  type: ActionType.SET_HA_NUM_NOISE_BITS,
  payload: { numBits },
})
