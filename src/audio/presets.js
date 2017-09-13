import { HearingLossGrade, SimulatorType } from 'src/constants.js'

export default {
  [SimulatorType.LOSS]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [7, 12, 15, 22, 25, 25, 25],
    [HearingLossGrade.MODERATE]: [22, 27, 30, 37, 40, 40, 40],
    [HearingLossGrade.SEVERE]: [30, 42, 45, 52, 55, 55, 55],
  },
  [SimulatorType.AID]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [4, 8, 10, 15, 18, 18, 18],
    [HearingLossGrade.MODERATE]: [22, 27, 30, 37, 40, 40, 40],
    [HearingLossGrade.SEVERE]: [30, 42, 45, 52, 55, 55, 55],
  },
}
