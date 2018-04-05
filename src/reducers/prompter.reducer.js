import { set } from 'lodash/fp'

import { ActionType } from 'src/constants.js'

const initialState = {
  prompts: {},
}

export default function(state = initialState, { type, payload }) {
  if (type === ActionType.ADD_PROMPT) {
    const { id, text, resolveLabel, rejectLabel, status } = payload
    const prompt = {
      id,
      text,
      resolveLabel,
      rejectLabel,
      status,
    }
    return set(['prompts', id], prompt, state)
  }
  if (type === ActionType.RESOLVE_PROMPT) {
    return set(['prompts', payload.id, 'status'], payload.status, state)
  }

  return state
}
