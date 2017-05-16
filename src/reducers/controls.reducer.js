import { ActionType, PlaybackState } from 'src/constants.js'

const initialState = {
  playbackState: PlaybackState.PAUSED,
  targetPosition: {
    azimuth: Math.PI * 0.5,
    distance: 20,
  },
  targetVolume: 0.5,
  maskVolume: 0.5,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_TARGET_POSITION) {
    return { ...state, targetPosition: payload.position }
  }
  if (type === ActionType.SET_TARGET_VOLUME) {
    return { ...state, targetVolume: payload.volume }
  }
  if (type === ActionType.SET_MASK_VOLUME) {
    return { ...state, maskVolume: payload.volume }
  }
  if (type === ActionType.SET_PLAYBACK_STATE) {
    return { ...state, playbackState: payload.state }
  }

  return state
}
