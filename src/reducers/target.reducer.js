import { ActionType } from '../constants.js'

const initialState = {
  targets: {
    speech: 'Speech',
    music: 'Music',
  },
  selected: null,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_TARGET) {
    return { ...state, selected: payload.target }
  }

  return state
}
