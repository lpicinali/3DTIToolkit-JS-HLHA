import { set } from 'lodash/fp'

import { ActionType, Ear, PlaybackState } from 'src/constants.js'

const initialState = {
  playbackState: PlaybackState.PAUSED,
  targetPosition: {
    azimuth: Math.PI * 0.5,
    distance: 2,
  },
  targetElevation: 0,
  targetVolume: 0.6,
  maskVolume: 1,
  isPerformanceModeEnabled: false,
  headRadius: 0.0875,
  isDirectionalityEnabled: true,
  directionalityValue: {
    [Ear.LEFT]: -1,
    [Ear.RIGHT]: -1,
  },
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.SET_TARGET_POSITION) {
    return { ...state, targetPosition: payload.position }
  }
  if (type === ActionType.SET_TARGET_ELEVATION) {
    return { ...state, targetElevation: payload.elevation }
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
  if (type === ActionType.SET_DIRECTIONALITY_VALUE) {
    return set(['directionalityValue', payload.ear], payload.value, state)
  }
  if (type === ActionType.SET_MASK_VOLUME) {
    return { ...state, maskVolume: payload.volume }
  }
  if (type === ActionType.SET_PLAYBACK_STATE) {
    return { ...state, playbackState: payload.state }
  }

  return state
}
