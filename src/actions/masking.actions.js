import { ActionType } from 'src/constants.js'

export const setMask = mask => ({
  type: ActionType.SET_MASK,
  payload: { mask },
})
