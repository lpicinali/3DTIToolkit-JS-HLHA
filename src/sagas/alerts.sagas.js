/* global window */
import { call, take } from 'redux-saga/effects'

import { ActionType } from 'src/constants.js'
import { wait } from 'src/utils.js'

export default function* alertsSagas() {
  // This hack triggers the dimensions container component to update
  // after the user has read the disclaimer. This fixes a bug where
  // the X/Z controls didn't work until the user scrolled.
  yield take(ActionType.SET_DISCLAIMER_READ)
  yield call(wait, 1000)
  yield call(window.scrollTo, 0, 1)
  yield call(window.scrollTo, 0, 0)
}
