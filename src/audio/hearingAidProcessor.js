import {
  Ear,
  HearingLossGrade,
  QuantisationStep,
  SimulatorType,
} from 'src/constants.js'
import {
  CHearingAidSim,
  EarPairBuffers,
  FloatVector,
  HearingAidSim_Process,
  T_ear,
} from 'src/audio/3dti-toolkit.js'
import context from 'src/audio/context.js'
import presets from 'src/audio/presets.js'

const numBands = presets[SimulatorType.LOSS][HearingLossGrade.NONE].length
const dBs_SPL_for_0_dBs_fs = 100

// Hearing loss simulation instance
const has = new CHearingAidSim()
has.Setup(
  44100,
  3, // Number of levels
  125, // Start frequency
  numBands, // Number of bands
  1, // Octave band step
  3000, // LPF frequency
  500, // HPF frequency
  0.707, // LPF Q
  1.4142, // BPF Q
  0.707 // HPF Q
)

has.Reset(T_ear.BOTH)
has.DisableHearingAidSimulation(T_ear.BOTH)
// has.EnableNormalization(T_ear.BOTH)
has.DisableQuantizationBeforeEqualizer()
has.DisableQuantizationAfterEqualizer()
has.SetQuantizationBits(12)
has.GetDynamicEqualizer(T_ear.LEFT).EnableLevelsInterpolation()
has.GetDynamicEqualizer(T_ear.RIGHT).EnableLevelsInterpolation()

let f = 0

// Buffers
const inputBuffers = new EarPairBuffers()
inputBuffers.Resize(512, 0)
const outputBuffers = new EarPairBuffers()
outputBuffers.Resize(512, 0)

// Audio processing
const hearingAidProcessor = context.createScriptProcessor(512, 2, 2)
hearingAidProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  for (let i = 0; i < inputBuffer.getChannelData(0).length; i++) {
    inputBuffers.Set(T_ear.LEFT, i, inputBuffer.getChannelData(0)[i])
    inputBuffers.Set(T_ear.RIGHT, i, inputBuffer.getChannelData(1)[i])
  }

  HearingAidSim_Process(has, inputBuffers, outputBuffers)

  for (let i = 0; i < 512; i++) {
    outputBuffer.getChannelData(0)[i] = outputBuffers.Get(T_ear.LEFT, i)
    outputBuffer.getChannelData(1)[i] = outputBuffers.Get(T_ear.RIGHT, i)
  }

  f++
}

// Enabled state
const setEnabled = isEnabled => {
  if (isEnabled === true) {
    has.EnableHearingAidSimulation(T_ear.BOTH)
  } else {
    has.DisableHearingAidSimulation(T_ear.BOTH)
  }
}

// Set band gains
const setGains = (ear, gains) => {
  const gainsVector = new FloatVector()
  gainsVector.resize(gains.length, 0)
  gains.forEach((gain, i) => gainsVector.set(i, gain))

  has.SetDynamicEqualizerUsingFig6(
    ear === Ear.LEFT ? T_ear.LEFT : T_ear.RIGHT,
    gainsVector,
    dBs_SPL_for_0_dBs_fs
  )
}

const setQuantisationStepEnabled = (step, isStepEnabled) => {
  if (step === QuantisationStep.BEFORE && isStepEnabled === true) {
    has.EnableQuantizationBeforeEqualizer()
  } else if (step === QuantisationStep.BEFORE && isStepEnabled === false) {
    has.DisableQuantizationBeforeEqualizer()
  } else if (step === QuantisationStep.AFTER && isStepEnabled === true) {
    has.EnableQuantizationAfterEqualizer()
  } else if (step === QuantisationStep.AFTER && isStepEnabled === false) {
    has.DisableQuantizationAfterEqualizer()
  }
}

// Set number of noise bits
const setNumNoiseBits = numBits => {
  has.SetQuantizationBits(numBits)
}

export default hearingAidProcessor

export {
  hearingAidProcessor,
  setEnabled,
  setGains,
  setQuantisationStepEnabled,
  setNumNoiseBits,
}
