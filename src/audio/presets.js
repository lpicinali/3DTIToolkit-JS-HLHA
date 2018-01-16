import { HearingLossGrade, SimulatorType } from 'src/constants.js'

export default {
  [SimulatorType.LOSS]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [7, 7, 12, 15, 22, 25, 25, 25, 25],
    [HearingLossGrade.MODERATE]: [22, 22, 27, 30, 37, 40, 40, 40, 40],
    [HearingLossGrade.SEVERE]: [47, 47, 52, 55, 62, 65, 65, 65, 65],
  },
  [SimulatorType.AID]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [4, 8, 10, 15, 18, 18, 18],
    [HearingLossGrade.MODERATE]: [17, 21, 23, 28, 31, 31, 31],
    [HearingLossGrade.SEVERE]: [42, 46, 48, 53, 56, 56, 56],
  },
}
