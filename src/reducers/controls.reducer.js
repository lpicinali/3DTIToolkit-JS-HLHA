import { ActionType, Ear, PlaybackState } from 'src/constants.js'

const initialState = {
  playbackState: PlaybackState.PAUSED,
  targetPosition: {
    azimuth: Math.PI * 0.5,
    distance: 30,
  },
  targetVolume: 0.5,
  maskVolume: 0.5,
  isPerformanceModeEnabled: false,
  headRadius: 0.0875,
  isDirectionalityEnabled: true,
  directionalityAttenuationLeft: 0,
  directionalityAttenuationRight: 0,
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_TARGET_POSITION) {
    return { ...state, targetPosition: payload.position }
  }
  if (type === ActionType.SET_TARGET_VOLUME) {
    return { ...state, targetVolume: payload.volume }
  }
  if (type === ActionType.SET_PERFORMANE_MODE_ENABLED) {
    return { ...state, isPerformanceModeEnabled: payload.isEnabled }
  }
  if (type === ActionType.SET_HEAD_RADIUS) {
    return { ...state, headRadius: payload.radius }
  }
  if (type === ActionType.SET_DIRECTIONALITY_ENABLED) {
    return { ...state, isDirectionalityEnabled: payload.isEnabled }
  }
  if (type === ActionType.SET_DIRECTIONALITY_ATTENUATION) {
    if (payload.ear === Ear.LEFT) {
      return { ...state, directionalityAttenuationLeft: payload.attenuation }
    } else if (payload.ear === Ear.RIGHT) {
      return { ...state, directionalityAttenuationRight: payload.attenuation }
    }
  }
  if (type === ActionType.SET_MASK_VOLUME) {
    return { ...state, maskVolume: payload.volume }
  }
  if (type === ActionType.SET_PLAYBACK_STATE) {
    return { ...state, playbackState: payload.state }
  }

  return state
}
