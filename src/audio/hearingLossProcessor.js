import { CHearingLossSim, CMonoBuffer, FloatVector, T_ear } from '3dti-toolkit'

import { HearingLossGrade, SimulatorType } from 'src/constants.js'
import context from 'src/audio/context.js'
import presets from 'src/audio/presets.js'

// Hearing loss simulation instance
const hls = new CHearingLossSim()
hls.Setup(
  44100,
  0,
  125,
  presets[SimulatorType.LOSS][HearingLossGrade.NONE].length,
  1
)

// Buffers
const inputStereoBufferLeft = new CMonoBuffer()
const inputStereoBufferRight = new CMonoBuffer()
const outputStereoBufferLeft = new CMonoBuffer()
const outputStereoBufferRight = new CMonoBuffer()
inputStereoBufferLeft.resize(512, 0)
inputStereoBufferRight.resize(512, 0)
outputStereoBufferLeft.resize(512, 0)
outputStereoBufferRight.resize(512, 0)

// Audio processing
const hearingLossProcessor = context.createScriptProcessor(512, 2, 2)
hearingLossProcessor.onaudioprocess = audioProcessingEvent => {
  const { inputBuffer, outputBuffer } = audioProcessingEvent

  const inputDataL = inputBuffer.getChannelData(0)
  const inputDataR = inputBuffer.getChannelData(1)

  for (let i = 0; i < inputDataL.length; i++) {
    inputStereoBufferLeft.set(i, inputDataL[i])
    inputStereoBufferRight.set(i, inputDataR[i])
  }

  hls.ProcessMono(T_ear.LEFT, inputStereoBufferLeft, outputStereoBufferLeft)
  hls.ProcessMono(T_ear.RIGHT, inputStereoBufferRight, outputStereoBufferRight)

  const outputDataLeft = outputBuffer.getChannelData(0)
  const outputDataRight = outputBuffer.getChannelData(1)

  for (let i = 0; i < outputDataLeft.length; i++) {
    outputDataLeft[i] = outputStereoBufferLeft.get(i)
    outputDataRight[i] = outputStereoBufferRight.get(i)
  }
}

// Set band gains
const setGains = gains => {
  gains.forEach((gain, i) => {
    hls.SetHearingLevel_dBHL(T_ear.LEFT, i, gain)
    hls.SetHearingLevel_dBHL(T_ear.RIGHT, i, gain)
  })
}

export default hearingLossProcessor

export { hearingLossProcessor, setGains }
