import uuid from 'uuid'

import { ActionType, PromptStatus } from 'src/constants.js'

export const addPrompt = ({ text, resolveLabel, rejectLabel }) => {
  const id = uuid.v4()
  const status = PromptStatus.UNRESOLVED
  return {
    type: ActionType.ADD_PROMPT,
    payload: { id, text, resolveLabel, rejectLabel, status },
  }
}

export const resolvePrompt = (id, status) => ({
  type: ActionType.RESOLVE_PROMPT,
  payload: { id, status },
})
