/* eslint import/prefer-default-export: 0 */
import { ActionType } from 'src/constants.js'

export const setHrtf = hrtfFilename => ({
  type: ActionType.SET_HRTF,
  payload: { hrtfFilename },
})
