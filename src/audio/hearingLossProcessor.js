import {
  CHearingLossSim,
  EarPairBuffers,
  FloatVector,
  ProcessHLS,
  T_ear,
} from '3dti-toolkit'

import { Ear, HearingLossGrade, SimulatorType } from 'src/constants.js'
import context from 'src/audio/context.js'
import presets from 'src/audio/presets.js'

// Hearing loss simulation instance
const hls = new CHearingLossSim()
hls.Setup(
  44100,
  100, // Calibration_dBs_SPL_for_0_dBs_fs
  62.5,
  presets[SimulatorType.LOSS][HearingLossGrade.NONE].length,
  3,
  512
)
hls.DisableTemporalDistortion(T_ear.BOTH)
hls.DisableFrequencySmearing(T_ear.BOTH)

// Buffers
const inputBuffers = new EarPairBuffers()
inputBuffers.Resize(512, 0)
const outputBuffers = new EarPairBuffers()
outputBuffers.Resize(512, 0)

let isEnabled = true
let f = 0

// Audio processing
const hearingLossProcessor = context.createScriptProcessor(512, 2, 2)
hearingLossProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  if (isEnabled === false) {
    for (let i = 0; i < 512; i++) {
      outputBuffer.getChannelData(0)[i] = inputBuffer.getChannelData(0)[i]
      outputBuffer.getChannelData(1)[i] = inputBuffer.getChannelData(1)[i]
    }
    return
  }

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

const setEnabled = newIsEnabled => {
  isEnabled = newIsEnabled
}

// Set band gains
const setGains = (ear, gains) => {
  const gainsVector = new FloatVector()
  gainsVector.resize(gains.length, 0)
  gains.forEach((gain, i) => gainsVector.set(i, gain))

  hls.SetFromAudiometry_dBHL(
    ear === Ear.LEFT ? T_ear.LEFT : T_ear.RIGHT,
    gainsVector
  )
}

const setFrequencySmearingPreset = (ear, preset) => {
  const toolkitEar = ear === Ear.LEFT ? T_ear.LEFT : T_ear.RIGHT

  if (preset === HearingLossGrade.NONE) {
    hls.DisableFrequencySmearing(toolkitEar)
  } else {
    hls.EnableFrequencySmearing(toolkitEar)

    const { bufferSize, smearing } = presets[SimulatorType.FREQUENCY_SMEARING][
      preset
    ]

    const smearingSimulator = hls.GetFrequencySmearingSimulator(toolkitEar)
    smearingSimulator.SetDownwardSmearingBufferSize(bufferSize.downward)
    smearingSimulator.SetUpwardSmearingBufferSize(bufferSize.upward)
    smearingSimulator.SetDownwardSmearing_Hz(smearing.downward)
    smearingSimulator.SetUpwardSmearing_Hz(smearing.upward)
  }
}

const setTemporalDistortionPreset = (ear, preset) => {
  const toolkitEar = ear === Ear.LEFT ? T_ear.LEFT : T_ear.RIGHT

  if (preset === HearingLossGrade.NONE) {
    hls.DisableTemporalDistortion(toolkitEar)
  } else {
    hls.EnableTemporalDistortion(toolkitEar)

    const presetValues = presets[SimulatorType.TEMPORAL_DISTORTION][preset]
    const tdSimulator = hls.GetTemporalDistortionSimulator()
    tdSimulator.SetLeftRightNoiseSynchronicity(presetValues.noiseSynchronicity)
    tdSimulator.SetWhiteNoisePower(toolkitEar, presetValues.whiteNoisePower)
    tdSimulator.SetNoiseAutocorrelationFilterCutoffFrequency(
      toolkitEar,
      presetValues.cutoffFrequency
    )
    tdSimulator.SetBandUpperLimit(toolkitEar, presetValues.bandUpperLimit)
  }
}

export default hearingLossProcessor

export {
  hearingLossProcessor,
  setEnabled,
  setGains,
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
}
