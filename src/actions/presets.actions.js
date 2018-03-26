/* eslint import/prefer-default-export: 0 */
import { ActionType } from 'src/constants.js'

export const setGlobalPreset = preset => ({
  type: ActionType.SET_GLOBAL_PRESET,
  payload: { preset },
})
