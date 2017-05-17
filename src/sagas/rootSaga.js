import { call, put, select, take } from 'redux-saga/effects'
import { values } from 'lodash'

import {
  ActionType,
  HearingLossGrade,
  PlaybackState,
  SonicComponent,
} from 'src/constants.js'
import { setHaGrade } from 'src/actions/ha.actions.js'
import { getFileUrl } from 'src/audio/audio-files.js'
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

function* applyComponentSource() {
  while (true) {
    const { type, payload } = yield take([
      ActionType.SET_TARGET,
      ActionType.SET_MASK,
    ])

    if (type === ActionType.SET_TARGET) {
      yield call(
        engine.setComponentSource,
        SonicComponent.TARGET,
        getFileUrl(payload.target)
      )
    } else if (type === ActionType.SET_MASK) {
      yield call(
        engine.setComponentSource,
        SonicComponent.MASK,
        getFileUrl(payload.mask)
      )
    }

    const playbackState = yield select(state => state.controls.playbackState)

    if (playbackState === PlaybackState.PLAYING) {
      yield call(engine.play)
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

function* makeAidFollowLoss() {
  while (true) {
    const { payload: { grade } } = yield take(ActionType.SET_HL_GRADE)

    const allGrades = values(HearingLossGrade)
    const currentAidPreset = yield select(state => state.ha.grade)
    if (allGrades.indexOf(grade) < allGrades.indexOf(currentAidPreset)) {
      yield put(setHaGrade(grade))
    }
  }
}

export default function* rootSaga() {
  yield [
    applyPlayPause(),
    applyComponentSource(),
    applyComponentVolume(),
    applySimulatorPresets(),
    applyTargetPosition(),
    makeAidFollowLoss(),
  ]
}
