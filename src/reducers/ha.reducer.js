import { ActionType } from 'src/constants.js'
import createHalReducer from 'src/reducers/createHalReducer.js'

export default createHalReducer((state, { type, payload }) => {
  if (type === ActionType.SET_HA_GRADE) {
    return { ...state, grade: payload.grade }
  }

  return state
})
