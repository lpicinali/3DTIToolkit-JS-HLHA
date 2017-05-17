import toolkit, { CHearingLossSim } from '3dti-toolkit'

import context from 'src/audio/context.js'
import {
  getInstance as getBinauralSpatializer,
} from 'src/audio/binauralSpatializer.js'
import hearingAidProcessor from 'src/audio/hearingAidProcessor.js'
import hearingLossProcessor from 'src/audio/hearingLossProcessor.js'

window.toolkit = toolkit || { nope: false }

let targetNode
const targetInput = context.createGain()
const targetVolume = context.createGain()

let maskNode
const maskInput = context.createGain()
const maskVolume = context.createGain()

const input = context.createGain()

const volume = context.createGain()
volume.gain.value = 0.3

getBinauralSpatializer().then(spatializer => {
  targetInput.connect(targetVolume)
  targetVolume.connect(spatializer.processor)
  spatializer.processor.connect(input)
  maskInput.connect(maskVolume)
  maskVolume.connect(input)
  input.connect(hearingLossProcessor)
  hearingLossProcessor.connect(hearingAidProcessor)
  hearingAidProcessor.connect(volume)
  volume.connect(context.destination)
})

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
    targetNode.start(0)
  }
  if (maskNode) {
    maskNode.start(0)
  }
}

export const stopNodes = () => {
  if (targetNode) {
    // Use disconnect instead of stop, because Safari
    targetNode.disconnect()
    targetNode = createNode(targetNode.buffer)
    setTargetNode(targetNode)
  }
  if (maskNode) {
    // Use disconnect instead of stop, because Safari
    maskNode.disconnect()
    maskNode = createNode(maskNode.buffer)
    setMaskNode(maskNode)
  }
}
