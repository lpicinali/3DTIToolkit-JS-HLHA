import { ActionType } from 'src/constants.js'

export const setHaEnabled = isEnabled => ({
  type: ActionType.SET_HA_ENABLED,
  payload: { isEnabled },
})

export const setHaLinked = isLinked => ({
  type: ActionType.SET_HA_LINKED,
  payload: { isLinked },
})

export const setHaGrade = (ear, grade) => ({
  type: ActionType.SET_HA_GRADE,
  payload: { ear, grade },
})

export const setHaNumNoiseBits = numBits => ({
  type: ActionType.SET_HA_NUM_NOISE_BITS,
  payload: { numBits },
})

export const setQuantisationStepEnabled = (step, isEnabled) => ({
  type: ActionType.SET_QUANTISATION_STEP_ENABLED,
  payload: { step, isEnabled },
})
