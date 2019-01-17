import { call, fork, put, take } from 'redux-saga/effects'
import got from 'got'

import { ActionType } from 'src/constants.js'
import { setHrtf } from 'src/actions/hrtf.actions.js'
import { toolkit } from 'src/audio/3dti-toolkit.js'
import { getInstance as getBinauralSpatializer } from 'src/audio/binauralSpatializer.js'

function* initialiseDefaultHrtf() {
  yield call(getBinauralSpatializer)
  yield put(setHrtf('3DTI_HRTF_IRC1053_512s_44100Hz.3dti-hrtf'))
}

function* doSetHrtfs() {
  while (true) {
    const { payload: { hrtfFilename } } = yield take(ActionType.SET_HRTF)

    const hrtfFileUrl = `/assets/hrtf/${hrtfFilename}`
    const hrtfResponse = yield call(got, hrtfFileUrl, { encoding: null })
    const hrtfBuffer = hrtfResponse.body

    const virtualHrtfFilePath = `/${hrtfFilename}`

    try {
      yield call(
        toolkit.FS_createDataFile,
        '/',
        hrtfFilename,
        hrtfBuffer,
        true,
        true,
        true
      )
    } catch (err) {
      if (err.code !== 'EEXIST') {
        console.log('Could not mount virtual HRTF file:')
        console.error(err)
      }
    }

    const binauralApi = yield call(getBinauralSpatializer)

    try {
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
