import { HearingLossGrade, SimulatorType } from 'src/constants.js'

export default {
  [SimulatorType.LOSS]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [7, 7, 12, 17, 28, 31, 31, 31, 31],
    [HearingLossGrade.MODERATE]: [32, 32, 37, 42, 53, 56, 56, 56, 56],
    [HearingLossGrade.SEVERE]: [62, 62, 67, 72, 83, 86, 86, 86, 86],
  },
  [SimulatorType.AID]: {
    [HearingLossGrade.NONE]: [0, 0, 0, 0, 0, 0, 0],
    [HearingLossGrade.MILD]: [4, 8, 10, 15, 18, 18, 18],
    [HearingLossGrade.MODERATE]: [17, 21, 23, 28, 31, 31, 31],
    [HearingLossGrade.SEVERE]: [42, 46, 48, 53, 56, 56, 56],
  },
  [SimulatorType.FREQUENCY_SMEARING]: {
    [HearingLossGrade.MILD]: {
      bufferSize: {
        upward: 15,
        downward: 15,
      },
      smearing: {
        upward: 35,
        downward: 35,
      },
    },
    [HearingLossGrade.MODERATE]: {
      bufferSize: {
        upward: 100,
        downward: 100,
      },
      smearing: {
        upward: 150,
        downward: 150,
      },
    },
    [HearingLossGrade.SEVERE]: {
      bufferSize: {
        upward: 150,
        downward: 150,
      },
      smearing: {
        upward: 650,
        downward: 650,
      },
    },
  },
  [SimulatorType.TEMPORAL_DISTORTION]: {
    [HearingLossGrade.MILD]: {
      noiseSynchronicity: 0,
      whiteNoisePower: 0.4,
      cutoffFrequency: 700,
      bandUpperLimit: 1600,
    },
    [HearingLossGrade.MODERATE]: {
      noiseSynchronicity: 0,
      whiteNoisePower: 0.8,
      cutoffFrequency: 850,
      bandUpperLimit: 3200,
    },
    [HearingLossGrade.SEVERE]: {
      noiseSynchronicity: 0,
      whiteNoisePower: 1,
      cutoffFrequency: 1000,
      bandUpperLimit: 12800,
    },
  },
}
