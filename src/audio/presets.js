import { HearingLossGrade, SimulatorType } from 'src/constants.js'

export default {
  [SimulatorType.LOSS]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [-7, -12, -15, -22, -25, -25, -25],
    [HearingLossGrade.MODERATE]: [-22, -27, -30, -37, 40, 40, 40],
    [HearingLossGrade.SEVERE]: [-47, -52, -55, -62, -65, -65, -65],
  },
  [SimulatorType.AID]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [0, 5, 8, 12, 14, 14, 14],
    [HearingLossGrade.MODERATE]: [12, 17, 20, 27, 30, 30, 30],
    [HearingLossGrade.SEVERE]: [30, 35, 38, 43, 45, 45, 45],
  },
}
