import { call, put, select, take } from 'redux-saga/effects'
import { get, reduce, values } from 'lodash'

import {
  ActionType,
  Ear,
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
      yield call(engine.setTargetSource, getFileUrl(payload.target))
    } else if (type === ActionType.SET_MASK) {
      const maskFilenames = yield select(state =>
        get(state, ['masking', 'masks', payload.mask, 'filename'])
      )
      const maskUrls = reduce(
        maskFilenames,
        (aggr, filename, channel) => ({
          ...aggr,
          [channel]: getFileUrl(filename),
        }),
        {}
      )
      yield call(engine.setMaskSource, maskUrls)
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

    const componentId =
      type === ActionType.SET_TARGET_VOLUME
        ? SonicComponent.TARGET
        : SonicComponent.MASK

    engine.setComponentVolume(componentId, payload.volume)
  }
}

function* applyPerformanceMode() {
  while (true) {
    const { payload } = yield take(ActionType.SET_PERFORMANE_MODE_ENABLED)
    engine.setPerformanceModeEnabled(payload.isEnabled)
  }
}

function* applyHeadRadius() {
  while (true) {
    const { payload } = yield take(ActionType.SET_HEAD_RADIUS)
    engine.setHeadRadius(payload.radius)
  }
}

function* applyDirectionalityEnabled() {
  while (true) {
    const { payload } = yield take(ActionType.SET_DIRECTIONALITY_ENABLED)
    engine.setDirectionalityEnabled(payload.isEnabled)
  }
}

function* applyDirectionalityAttenuation() {
  while (true) {
    const { payload } = yield take(ActionType.SET_DIRECTIONALITY_VALUE)
    const attenuation = payload.value * 30
    engine.setDirectionalityAttenuation(Ear.LEFT, attenuation)
    engine.setDirectionalityAttenuation(Ear.RIGHT, attenuation)
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

function* applyAidNoiseBits() {
  while (true) {
    const { payload: { numBits } } = yield take(
      ActionType.SET_HA_NUM_NOISE_BITS
    )

    yield call(engine.setHearingAidNumNoiseBits, numBits)
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
    applyPerformanceMode(),
    applyHeadRadius(),
    applyDirectionalityEnabled(),
    applyDirectionalityAttenuation(),
    applySimulatorPresets(),
    applyTargetPosition(),
    applyAidNoiseBits(),
    makeAidFollowLoss(),
  ]
}
