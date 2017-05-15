import decode from 'audio-decode'
import bufferToArrayBuffer from 'buffer-to-arraybuffer'
import got from 'got'

import { SimulatorType, SonicComponent } from 'src/constants.js'
import {
  createNode,
  setTargetNode,
  setMaskNode,
  setTargetVolume,
  setMaskVolume,
  startNodes,
  stopNodes,
} from 'src/audio/chain.js'
import context from 'src/audio/context.js'
import presets from 'src/audio/presets.js'

export const play = () => {
  console.log('play')
  startNodes()
}

export const pause = () => {
  console.log('pause')
  stopNodes()
}

export const setComponentSource = (id, url) => {
  console.log('setComponentSource', id, url)

  pause()

  return got(url, { encoding: null })
    .then(response => bufferToArrayBuffer(response.body))
    .then(arrayBuffer => decode(arrayBuffer, { context }))
    .then(audioBuffer => {
      const node = createNode(audioBuffer)
      if (id === SonicComponent.TARGET) {
        setTargetNode(node)
      } else if (id === SonicComponent.MASK) {
        setMaskNode(node)
      }
    })
    .catch(err => console.error(err))
}

export const setComponentVolume = (id, volume) => {
  console.log('setComponentVolume', { id, volume })

  if (id === SonicComponent.TARGET) {
    setTargetVolume(volume)
  } else if (id === SonicComponent.MASK) {
    setMaskVolume(volume)
  }
}

export const setComponentPosition = (id, { azimuth, distance }) => {
  console.log('setComponentPosition', id, { azimuth, distance })
}

export const setHearingLossPreset = presetName => {
  const values = presets[SimulatorType.LOSS][presetName]
  console.log('setHearingLossPreset', presetName, values)
}

export const setHearingAidPreset = presetName => {
  const values = presets[SimulatorType.AID][presetName]
  console.log('setHearingAidPreset', presetName, values)
}
