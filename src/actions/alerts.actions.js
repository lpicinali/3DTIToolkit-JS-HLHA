import { ActionType } from 'src/constants.js'

export const setDisclaimerRead = isRead => ({
  type: ActionType.SET_DISCLAIMER_READ,
  payload: { isRead },
})

export const setHrtfInfoDismissed = isDismissed => ({
  type: ActionType.SET_HRTF_INFO_DISMISSED,
  payload: { isDismissed },
})

export const setPresetInfoDismissed = isDismissed => ({
  type: ActionType.SET_PRESET_INFO_DISMISSED,
  payload: { isDismissed },
})
