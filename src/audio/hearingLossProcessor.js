import { CHearingLossSim, CStereoBuffer, FloatVector } from '3dti-toolkit'

import context from 'src/audio/context.js'

// Hearing loss simulation instance
const hls = new CHearingLossSim()
hls.Setup(125, 7, 1, 0.7)

// Buffers
const inputStereoBuffer = new CStereoBuffer()
const outputStereoBuffer = new CStereoBuffer()
inputStereoBuffer.resize(1024, 0)
outputStereoBuffer.resize(1024, 0)

// Audio processing
const hearingLossProcessor = context.createScriptProcessor(512, 2, 2)
hearingLossProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  const inputDataL = inputBuffer.getChannelData(0)
  const inputDataR = inputBuffer.getChannelData(1)

  for (let i = 0; i < inputDataL.length; i++) {
    inputStereoBuffer.set(i * 2, inputDataL[i])
    inputStereoBuffer.set(i * 2 + 1, inputDataR[i])
  }

  hls.Process(
    inputStereoBuffer,
    outputStereoBuffer,
    true,
    true,
    true,
    true,
    true
  )

  const outputDataLeft = outputBuffer.getChannelData(0)
  const outputDataRight = outputBuffer.getChannelData(1)

  for (let i = 0; i < outputDataLeft.length; i++) {
    outputDataLeft[i] = outputStereoBuffer.get(i * 2)
    outputDataRight[i] = outputStereoBuffer.get(i * 2 + 1)
  }
}

// Set band gains
const setGains = gains => {
  const gainVector = new FloatVector()
  gainVector.resize(gains.length, 0)

  for (let i = 0; i < gains.length; i++) {
    gainVector.set(i, gains[i])
  }

  hls.SetGains_dB(gainVector, true)
  hls.SetGains_dB(gainVector, false)
}

export default hearingLossProcessor

export { hearingLossProcessor, setGains }
