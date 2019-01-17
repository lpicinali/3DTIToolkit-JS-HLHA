import { set } from 'lodash/fp'

import { ActionType } from 'src/constants.js'

const initialState = {
  hrtfFilename: null,
}

export default (state = initialState, { type, payload }) => {
  if (type === ActionType.SET_HRTF) {
    return set('hrtfFilename', payload.hrtfFilename, state)
  }

  return state
}
