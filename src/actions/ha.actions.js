import { ActionType } from '../constants.js'

export const setHaGrade = grade => ({
  type: ActionType.SET_HA_GRADE,
  payload: { grade },
})
