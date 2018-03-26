import { ActionType, SonicComponent } from 'src/constants.js'
import audioFiles from 'src/audio/audio-files.js'

const initialState = {
  targets: audioFiles[SonicComponent.TARGET].reduce(
    (aggr, file) => ({
      ...aggr,
      [file.filename]: file,
    }),
    {}
  ),
  selected: audioFiles[SonicComponent.TARGET][0].filename,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_TARGET) {
    return { ...state, selected: payload.target }
  }

  return state
}
