import { ActionType } from 'src/constants.js'

export const setTargetPosition = position => ({
  type: ActionType.SET_TARGET_POSITION,
  payload: { position },
})

export const setTargetVolume = volume => ({
  type: ActionType.SET_TARGET_VOLUME,
  payload: { volume },
})

export const setPerformanceModeEnabled = isEnabled => ({
  type: ActionType.SET_PERFORMANE_MODE_ENABLED,
  payload: { isEnabled },
})

export const setHeadRadius = radius => ({
  type: ActionType.SET_HEAD_RADIUS,
  payload: { radius },
})

export const setDirectionalityEnabled = isEnabled => ({
  type: ActionType.SET_DIRECTIONALITY_ENABLED,
  payload: { isEnabled },
})

export const setDirectionalityValue = value => ({
  type: ActionType.SET_DIRECTIONALITY_VALUE,
  payload: { value },
})

export const setMaskVolume = volume => ({
  type: ActionType.SET_MASK_VOLUME,
  payload: { volume },
})

export const setPlaybackState = state => ({
  type: ActionType.SET_PLAYBACK_STATE,
  payload: { state },
})
