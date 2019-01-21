import { call, fork, put, take } from 'redux-saga/effects'
import {
  fetchHrtfFile,
  registerHrtf,
} from '@reactify/3dti-toolkit/lib/binaural/hrtf.js'

import { ActionType } from 'src/constants.js'
import { setHrtf } from 'src/actions/hrtf.actions.js'
import { toolkit } from 'src/audio/3dti-toolkit.js'
import { getInstance as getBinauralSpatializer } from 'src/audio/binauralSpatializer.js'

function* initialiseDefaultHrtf() {
  yield call(getBinauralSpatializer)
  yield put(setHrtf('3DTI_HRTF_IRC1053_256s_44100Hz.3dti-hrtf'))
}

function* doSetHrtfs() {
  while (true) {
    const { payload: { hrtfFilename } } = yield take(ActionType.SET_HRTF)

    try {
      const hrtfData = yield call(fetchHrtfFile, `/assets/hrtf/${hrtfFilename}`)
      const virtualHrtfFilePath = yield call(
        registerHrtf,
        toolkit,
        hrtfFilename,
        hrtfData
      )

      const binauralApi = yield call(getBinauralSpatializer)
      yield call(binauralApi.setHrtf, virtualHrtfFilePath)
    } catch (err) {
      console.log('Could not set HRTF:')
      console.log(err)
    }
  }
}

export default function* hrtfSagas() {
  yield fork(initialiseDefaultHrtf)
  yield fork(doSetHrtfs)
}
