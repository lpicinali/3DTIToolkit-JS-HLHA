import { ActionType } from 'src/constants.js'

export const setHlGrade = grade => ({
  type: ActionType.SET_HL_GRADE,
  payload: { grade },
})
