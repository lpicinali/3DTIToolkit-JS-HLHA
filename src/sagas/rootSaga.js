import { fork } from 'redux-saga/effects'

import audioEngineSagas from 'src/sagas/audioEngine.sagas.js'
import presetSagas from 'src/sagas/presets.sagas.js'

export default function* rootSaga() {
  yield fork(audioEngineSagas)
  yield fork(presetSagas)
}
