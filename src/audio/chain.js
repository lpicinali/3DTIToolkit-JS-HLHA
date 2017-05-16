import toolkit, { CHearingLossSim } from '3dti-toolkit'

console.log({ toolkit, CHearingLossSim })
window.toolkit = toolkit || { nope: false }

import context from 'src/audio/context.js'
import hearingAidProcessor from 'src/audio/hearingAidProcessor.js'
import hearingLossProcessor from 'src/audio/hearingLossProcessor.js'

let targetNode
const targetInput = context.createGain()
const targetVolume = context.createGain()

let maskNode
const maskInput = context.createGain()
const maskVolume = context.createGain()

const input = context.createGain()

const volume = context.createGain()
volume.gain.value = 0.3

targetInput.connect(targetVolume)
targetVolume.connect(input)
maskInput.connect(maskVolume)
maskVolume.connect(input)
input.connect(hearingLossProcessor)
hearingLossProcessor.connect(hearingAidProcessor)
hearingAidProcessor.connect(volume)
volume.connect(context.destination)

export const createNode = audioBuffer => {
  const node = context.createBufferSource()
  node.buffer = audioBuffer
  node.loop = true

  return node
}

export const setTargetNode = node => {
  if (targetNode) {
    targetNode.disconnect()
  }
  targetNode = node
  targetNode.connect(targetInput)
}

export const setMaskNode = node => {
  if (maskNode) {
    maskNode.disconnect()
  }
  maskNode = node
  maskNode.connect(maskInput)
}

export const setTargetVolume = volume => {
  targetVolume.gain.value = volume
}

export const setMaskVolume = volume => {
  maskVolume.gain.value = volume
}

export const startNodes = () => {
  if (targetNode) {
    targetNode.start()
  }
  if (maskNode) {
    maskNode.start()
  }
}

export const stopNodes = () => {
  if (targetNode) {
    targetNode.stop()
    targetNode = createNode(targetNode.buffer)
    setTargetNode(targetNode)
  }
  if (maskNode) {
    maskNode.stop()
    maskNode = createNode(maskNode.buffer)
    setMaskNode(maskNode)
  }
}
