/* eslint import/prefer-default-export: 0 */
import { ActionType } from 'src/constants.js'

export const setHlEnabled = isEnabled => ({
  type: ActionType.SET_HL_ENABLED,
  payload: { isEnabled },
})

export const setHlLinked = isLinked => ({
  type: ActionType.SET_HL_LINKED,
  payload: { isLinked },
})

export const setFrequencySmearingPreset = (ear, preset) => ({
  type: ActionType.SET_HL_FREQUENCY_SMEARING_PRESET,
  payload: { ear, preset },
})

export const setTemporalDistortionPreset = (ear, preset) => ({
  type: ActionType.SET_HL_TEMPORAL_DISTORTION_PRESET,
  payload: { ear, preset },
})

export const setHlGrade = (ear, grade) => ({
  type: ActionType.SET_HL_GRADE,
  payload: { ear, grade },
})
