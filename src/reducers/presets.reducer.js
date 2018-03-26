import { ActionType, GlobalPreset } from 'src/constants.js'

const initialState = {
  preset: GlobalPreset.NONE,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_GLOBAL_PRESET) {
    return { ...state, preset: payload.preset }
  }

  return state
}
