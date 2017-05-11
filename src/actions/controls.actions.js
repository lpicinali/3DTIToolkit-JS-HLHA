import { ActionType } from 'src/constants.js'

export const setTargetPosition = position => ({
  type: ActionType.SET_TARGET_POSITION,
  payload: { position },
})

export const setTargetVolume = volume => ({
  type: ActionType.SET_TARGET_VOLUME,
  payload: { volume },
})

export const setMaskVolume = volume => ({
  type: ActionType.SET_MASK_VOLUME,
  payload: { volume },
})

export const setPlaybackState = state => ({
  type: ActionType.SET_PLAYBACK_STATE,
  payload: { state },
})
