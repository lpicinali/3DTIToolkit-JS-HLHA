/* global window */
import toolkit from '3dti-toolkit'

import { Ear } from 'src/constants.js'
import context from 'src/audio/context.js'
import { getInstance as getBinauralSpatializer } from 'src/audio/binauralSpatializer.js'
import hearingAidProcessor from 'src/audio/hearingAidProcessor.js'
import hearingLossProcessor from 'src/audio/hearingLossProcessor.js'

window.toolkit = toolkit || { nope: false }

let targetNode
const targetInput = context.createGain()
const targetVolume = context.createGain()

const maskNodes = {
  [Ear.LEFT]: null,
  [Ear.RIGHT]: null,
}
const maskInputs = {
  [Ear.LEFT]: context.createGain(),
  [Ear.RIGHT]: context.createGain(),
}
const maskVolumes = {
  [Ear.LEFT]: context.createGain(),
  [Ear.RIGHT]: context.createGain(),
}

const input = context.createGain()

const volume = context.createGain()
volume.gain.value = 0.3

getBinauralSpatializer().then(spatializer => {
  // Target
  targetInput.connect(targetVolume)
  targetVolume.connect(spatializer.processor)
  spatializer.processor.connect(input)

  // Masks
  maskInputs[Ear.LEFT].connect(maskVolumes[Ear.LEFT])
  maskInputs[Ear.RIGHT].connect(maskVolumes[Ear.RIGHT])
  maskVolumes[Ear.LEFT].connect(spatializer.masks[Ear.LEFT].processor)
  maskVolumes[Ear.RIGHT].connect(spatializer.masks[Ear.RIGHT].processor)
  spatializer.masks[Ear.LEFT].processor.connect(input)
  spatializer.masks[Ear.RIGHT].processor.connect(input)

  // Simulators
  input.connect(hearingLossProcessor)
  hearingLossProcessor.connect(hearingAidProcessor)
  hearingAidProcessor.connect(volume)

  // Master volume
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

export const setMaskNode = (node, channel) => {
  if (maskNodes[channel]) {
    maskNodes[channel].disconnect()
  }
  maskNodes[channel] = node
  maskNodes[channel].connect(maskInputs[channel])
}

export const setTargetVolume = newVolume => {
  targetVolume.gain.value = newVolume
}

export const setMaskVolume = newVolume => {
  maskVolumes[Ear.LEFT].gain.value = newVolume
  maskVolumes[Ear.RIGHT].gain.value = newVolume
}

export const startNodes = () => {
  if (targetNode) {
    targetNode.start(0)
  }
  if (maskNodes[Ear.LEFT]) {
    maskNodes[Ear.LEFT].start(0)
  }
  if (maskNodes[Ear.RIGHT]) {
    maskNodes[Ear.RIGHT].start(0)
  }
}

export const stopNodes = () => {
  if (targetNode) {
    // Use disconnect instead of stop, because Safari
    targetNode.disconnect()
    targetNode = createNode(targetNode.buffer)
    setTargetNode(targetNode)
  }
  if (maskNodes[Ear.LEFT]) {
    // Use disconnect instead of stop, because Safari
    maskNodes[Ear.LEFT].disconnect()
    maskNodes[Ear.LEFT] = createNode(maskNodes[Ear.LEFT].buffer)
    setMaskNode(maskNodes[Ear.LEFT], Ear.LEFT)
  }
  if (maskNodes[Ear.RIGHT]) {
    // Use disconnect instead of stop, because Safari
    maskNodes[Ear.RIGHT].disconnect()
    maskNodes[Ear.RIGHT] = createNode(maskNodes[Ear.RIGHT].buffer)
    setMaskNode(maskNodes[Ear.RIGHT], Ear.RIGHT)
  }
}
