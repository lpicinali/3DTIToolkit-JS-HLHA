export const ActionType = {
  SET_HA_GRADE: 'SET_HA_GRADE',
  SET_HL_GRADE: 'SET_HL_GRADE',

  SET_TARGET: 'SET_TARGET',
  SET_MASK: 'SET_MASK',

  SET_TARGET_POSITION: 'SET_TARGET_POSITION',
  SET_TARGET_VOLUME: 'SET_TARGET_VOLUME',
  SET_MASK_VOLUME: 'SET_MASK_VOLUME',
  SET_PLAYBACK_STATE: 'SET_PLAYBACK_STATE',
}

export const HearingLossGrade = {
  NONE: 'NONE',
  MILD: 'MILD',
  MODERATE: 'MODERATE',
  SEVERE: 'SEVERE',
}

export const SimulatorType = {
  AID: 'AID',
  LOSS: 'LOSS',
}

export const SonicComponent = {
  TARGET: 'TARGET',
  MASK: 'MASK',
}

export const PlaybackState = {
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING',
}
