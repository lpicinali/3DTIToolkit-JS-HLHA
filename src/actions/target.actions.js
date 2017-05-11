import { ActionType } from '../constants.js'

export const setTarget = target => ({
  type: ActionType.SET_TARGET,
  payload: { target },
})
