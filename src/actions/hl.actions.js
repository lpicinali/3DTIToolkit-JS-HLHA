/* eslint import/prefer-default-export: 0 */
import { ActionType } from 'src/constants.js'

export const setFrequencySmearingPreset = preset => ({
  type: ActionType.SET_HL_FREQUENCY_SMEARING_PRESET,
  payload: { preset },
})

export const setTemporalDistortionPreset = preset => ({
  type: ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET,
  payload: { preset },
})

export const setHlGrade = grade => ({
  type: ActionType.SET_HL_GRADE,
  payload: { grade },
})
