import { call, take } from 'redux-saga/effects'
import got from 'got'

import { ActionType } from 'src/constants.js'
import { toolkit } from 'src/audio/3dti-toolkit.js'
import { getInstance as getBinauralSpatializer } from 'src/audio/binauralSpatializer.js'

export default function* hrtfSagas() {
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
