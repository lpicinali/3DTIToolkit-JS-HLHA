/* eslint import/prefer-default-export: 0 */
import { ActionType } from 'src/constants.js'

export const setFrequencySmearingEnabled = isEnabled => ({
  type: ActionType.SET_HL_FREQUENCY_SMEARING_ENABLED,
  payload: { isEnabled },
})

export const setHlGrade = grade => ({
  type: ActionType.SET_HL_GRADE,
  payload: { grade },
})
