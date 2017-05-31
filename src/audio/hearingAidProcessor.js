import { CHearingAidSim, CStereoBuffer, FloatVector } from '3dti-toolkit'

import context from 'src/audio/context.js'

// Hearing loss simulation instance
const has = new CHearingAidSim()
has.Setup(
  44100,
  1, // TODO: Implement multiple levels
  125, // Start frequency
  7, // Number of bands
  1, // Octave band step
  3000, // LPF frequency
  300, // HPF frequency
  0.7, // LPF Q
  0.7, // BPF Q
  0.7 // HPF Q
)

// Add noise
has.addNoiseBefore = true
has.addNoiseAfter = true
has.noiseNumBits = 8

let isEnabled = false

// Buffers
const inputStereoBuffer = new CStereoBuffer()
const outputStereoBuffer = new CStereoBuffer()
inputStereoBuffer.resize(1024, 0)
outputStereoBuffer.resize(1024, 0)

// Audio processing
const hearingAidProcessor = context.createScriptProcessor(512, 2, 2)
hearingAidProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  const inputDataL = inputBuffer.getChannelData(0)
  const inputDataR = inputBuffer.getChannelData(1)

  for (let i = 0; i < inputDataL.length; i++) {
    inputStereoBuffer.set(i * 2, inputDataL[i])
    inputStereoBuffer.set(i * 2 + 1, inputDataR[i])
  }

  has.Process(inputStereoBuffer, outputStereoBuffer, isEnabled, isEnabled)

  const outputDataLeft = outputBuffer.getChannelData(0)
  const outputDataRight = outputBuffer.getChannelData(1)

  for (let i = 0; i < outputDataLeft.length; i++) {
    outputDataLeft[i] = outputStereoBuffer.get(i * 2)
    outputDataRight[i] = outputStereoBuffer.get(i * 2 + 1)
  }
}

// Enabled state
const setEnabled = enabled => {
  isEnabled = enabled
}

// Set band gains
const setGains = gains => {
  const gainVector = new FloatVector()
  gainVector.resize(gains.length, 0)

  for (let i = 0; i < gains.length; i++) {
    gainVector.set(i, gains[i])
  }

  has.SetGains_dB(gainVector, true)
  has.SetGains_dB(gainVector, false)
}

// Set number of noise bits
const setNumNoiseBits = numBits => {
  has.noiseNumBits = numBits
}

export default hearingAidProcessor

export { hearingAidProcessor, setEnabled, setGains, setNumNoiseBits }
