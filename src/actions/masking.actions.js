import { ActionType } from '../constants.js'

export const setMask = mask => ({
  type: ActionType.SET_MASK,
  payload: { mask },
})
