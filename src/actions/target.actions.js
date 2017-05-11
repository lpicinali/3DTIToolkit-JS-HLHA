import { ActionType } from 'src/constants.js'

export const setTarget = target => ({
  type: ActionType.SET_TARGET,
  payload: { target },
})
