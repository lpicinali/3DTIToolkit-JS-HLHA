import { ActionType } from 'src/constants.js'

const initialState = {
  masks: {
    speech: 'Speech',
    traffic: 'Traffic',
    restaurant: 'Restaurant',
  },
  selected: null,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_MASK) {
    return { ...state, selected: payload.mask }
  }

  return state
}
