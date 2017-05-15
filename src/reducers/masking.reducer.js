import { ActionType, SonicComponent } from 'src/constants.js'
import audioFiles from 'src/audio/audio-files.js'

const initialState = {
  masks: audioFiles[SonicComponent.MASK].reduce(
    (aggr, filename) => ({
      ...aggr,
      [filename]: filename,
    }),
    {}
  ),
  selected: null,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_MASK) {
    return { ...state, selected: payload.mask }
  }

  return state
}
