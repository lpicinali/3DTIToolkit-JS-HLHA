import {
  CHearingLossSim,
  EarPairBuffers,
  FloatVector,
  ProcessHLS,
  T_ear,
} from '3dti-toolkit'

import { HearingLossGrade, SimulatorType } from 'src/constants.js'
import context from 'src/audio/context.js'
import presets from 'src/audio/presets.js'

// Hearing loss simulation instance
const hls = new CHearingLossSim()
hls.Setup(
  44100,
  100, // Calibration_dBs_SPL_for_0_dBs_fs
  62.5,
  presets[SimulatorType.LOSS][HearingLossGrade.NONE].length,
  1,
  512
)
hls.DisableTemporalDistortion(T_ear.BOTH)
hls.DisableFrequencySmearing(T_ear.BOTH)

// Buffers
const inputBuffers = new EarPairBuffers()
inputBuffers.Resize(512, 0)
const outputBuffers = new EarPairBuffers()
outputBuffers.Resize(512, 0)

let f = 0

// Audio processing
const hearingLossProcessor = context.createScriptProcessor(512, 2, 2)
hearingLossProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  const inputDataL = inputBuffer.getChannelData(0)
  const inputDataR = inputBuffer.getChannelData(1)

  for (let i = 0; i < inputDataL.length; i++) {
    inputBuffers.Set(T_ear.LEFT, i, inputDataL[i])
    inputBuffers.Set(T_ear.RIGHT, i, inputDataR[i])
  }

  ProcessHLS(hls, inputBuffers, outputBuffers)

  if (f % 10 === 0) {
    // console.log(outputBuffers.GetLeft().get(111))
  }

  const outputDataLeft = outputBuffer.getChannelData(0)
  const outputDataRight = outputBuffer.getChannelData(1)

  for (let i = 0; i < outputDataLeft.length; i++) {
    outputDataLeft[i] = outputBuffers.Get(T_ear.LEFT, i)
    outputDataRight[i] = outputBuffers.Get(T_ear.RIGHT, i)
  }

  f++
}

// Set band gains
const setGains = gains => {
  const gainsVector = new FloatVector()
  gainsVector.resize(gains.length, 0)
  gains.forEach((gain, i) => gainsVector.set(i, gain))

  hls.SetFromAudiometry_dBHL(T_ear.BOTH, gainsVector)
}

const setFrequencySmearingPreset = preset => {
  if (preset === HearingLossGrade.NONE) {
    hls.DisableFrequencySmearing(T_ear.BOTH)
  } else {
    hls.EnableFrequencySmearing(T_ear.BOTH)

    const { bufferSize, smearing } = presets[SimulatorType.FREQUENCY_SMEARING][
      preset
    ]
    for (const ear in [T_ear.LEFT, T_ear.RIGHT]) {
      const smearingSimulator = hls.GetFrequencySmearingSimulator(ear)
      smearingSimulator.SetDownwardSmearingBufferSize(bufferSize.downward)
      smearingSimulator.SetUpwardSmearingBufferSize(bufferSize.upward)
      smearingSimulator.SetDownwardSmearing_Hz(smearing.downward)
      smearingSimulator.SetUpwardSmearing_Hz(smearing.upward)
    }
  }
}

const setTemporalDistortionPreset = preset => {
  if (preset === HearingLossGrade.NONE) {
    hls.DisableTemporalDistortion(T_ear.BOTH)
  } else {
    hls.EnableTemporalDistortion(T_ear.BOTH)

    const presetValues = presets[SimulatorType.TEMPORAL_DISTORTION][preset]
    const tdSimulator = hls.GetTemporalDistortionSimulator()
    tdSimulator.SetLeftRightNoiseSynchronicity(presetValues.noiseSynchronicity)
    tdSimulator.SetWhiteNoisePower(T_ear.LEFT, presetValues.whiteNoisePower)
    tdSimulator.SetWhiteNoisePower(T_ear.RIGHT, presetValues.whiteNoisePower)
    tdSimulator.SetNoiseAutocorrelationFilterCutoffFrequency(
      T_ear.LEFT,
      presetValues.cutoffFrequency
    )
    tdSimulator.SetNoiseAutocorrelationFilterCutoffFrequency(
      T_ear.RIGHT,
      presetValues.cutoffFrequency
    )
    tdSimulator.SetBandUpperLimit(T_ear.LEFT, presetValues.bandUpperLimit)
    tdSimulator.SetBandUpperLimit(T_ear.RIGHT, presetValues.bandUpperLimit)
  }
}

export default hearingLossProcessor

export {
  hearingLossProcessor,
  setGains,
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
}
