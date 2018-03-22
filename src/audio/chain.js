/* global window */
import toolkit from '3dti-toolkit'

import { Ear } from 'src/constants.js'
// import { analysersInput, getAnalyserData } from 'src/audio/analysers.js'
import context from 'src/audio/context.js'
import { getInstance as getBinauralSpatializer } from 'src/audio/binauralSpatializer.js'
import hearingAidProcessor from 'src/audio/hearingAidProcessor.js'
import hearingLossProcessor from 'src/audio/hearingLossProcessor.js'

window.toolkit = toolkit || { nope: false }

let targetNode = null
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
volume.gain.value = 0.5

getBinauralSpatializer().then(spatializer => {
  // Target
  targetInput.connect(targetVolume)
  targetVolume.connect(spatializer.processor)
  spatializer.processor.connect(input)

  targetVolume.gain.value = 0.6

  // Masks
  maskInputs[Ear.LEFT].connect(maskVolumes[Ear.LEFT])
  maskInputs[Ear.RIGHT].connect(maskVolumes[Ear.RIGHT])
  maskVolumes[Ear.LEFT].connect(spatializer.masks[Ear.LEFT].processor)
  maskVolumes[Ear.RIGHT].connect(spatializer.masks[Ear.RIGHT].processor)
  spatializer.masks[Ear.LEFT].processor.connect(input)
  spatializer.masks[Ear.RIGHT].processor.connect(input)

  maskVolumes[Ear.LEFT].gain.value = 1
  maskVolumes[Ear.RIGHT].gain.value = 1

  // Simulators
  input.connect(hearingLossProcessor)
  hearingLossProcessor.connect(hearingAidProcessor)
  hearingAidProcessor.connect(volume)

  // Analysers
  // hearingAidProcessor.connect(analysersInput)

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
  if (node) {
    targetNode = node
    targetNode.connect(targetInput)
  } else {
    targetNode = null
  }
}

export const setMaskNode = (node, channel) => {
  if (maskNodes[channel]) {
    maskNodes[channel].disconnect()
  }
  if (node) {
    maskNodes[channel] = node
    maskNodes[channel].connect(maskInputs[channel])
  } else {
    maskNodes[channel] = null
  }
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

export const stopTargetNode = () => {
  if (targetNode) {
    // Use disconnect instead of stop, because Safari
    targetNode.disconnect()
    targetNode = createNode(targetNode.buffer)
    setTargetNode(targetNode)
  }
}

export const stopMaskNodes = () => {
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

export const stopNodes = () => {
  stopTargetNode()
  stopMaskNodes()
}
