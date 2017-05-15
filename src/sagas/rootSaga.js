import { take } from 'redux-saga/effects'

import { ActionType, PlaybackState, SonicComponent } from 'src/constants.js'
import * as engine from 'src/audio/engine.js'

function* applyPlayPause() {
  while (true) {
    const { payload: { state } } = yield take(ActionType.SET_PLAYBACK_STATE)

    if (state === PlaybackState.PLAYING) {
      engine.play()
    } else if (state === PlaybackState.PAUSED) {
      engine.pause()
    }
  }
}

function* applyComponentVolume() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_TARGET_VOLUME,
      ActionType.SET_MASK_VOLUME,
    ])

    const componentId = type === ActionType.SET_TARGET_VOLUME
      ? SonicComponent.TARGET
      : SonicComponent.MASK

    engine.setComponentVolume(componentId, payload.volume)
  }
}

function* applySimulatorPresets() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_HL_GRADE,
      ActionType.SET_HA_GRADE,
    ])

    if (type === ActionType.SET_HL_GRADE) {
      engine.setHearingLossPreset(payload.grade)
    } else if (type === ActionType.SET_HA_GRADE) {
      engine.setHearingAidPreset(payload.grade)
    }
  }
}

function* applyTargetPosition() {
  while (true) {
    const { payload } = yield take(ActionType.SET_TARGET_POSITION)
    const { azimuth, distance } = payload.position

    engine.setComponentPosition(SonicComponent.TARGET, { azimuth, distance })
  }
}

export default function* rootSaga() {
  yield [
    applyPlayPause(),
    applyComponentVolume(),
    applySimulatorPresets(),
    applyTargetPosition(),
  ]
}
