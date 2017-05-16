import decode from 'audio-decode'
import bufferToArrayBuffer from 'buffer-to-arraybuffer'
import got from 'got'

import {
  HearingLossGrade,
  SimulatorType,
  SonicComponent,
} from 'src/constants.js'
import { getInstance } from 'src/audio/binauralSpatializer.js'
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
import {
  setEnabled as setHearingAidEnabled,
  setGains as setHearingAidGains,
} from 'src/audio/hearingAidProcessor.js'
import {
  setGains as setHearingLossGains,
} from 'src/audio/hearingLossProcessor.js'
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

  if (id === SonicComponent.TARGET) {
    getInstance().then(spatializer => {
      spatializer.setSourcePosition(azimuth, distance)
    })
  }
}

export const setHearingLossPreset = presetName => {
  const gains = presets[SimulatorType.LOSS][presetName]
  console.log('setHearingLossPreset', presetName, gains)

  setHearingLossGains(gains)
}

export const setHearingAidPreset = presetName => {
  const gains = presets[SimulatorType.AID][presetName]
  console.log('setHearingAidPreset', presetName, gains)

  setHearingAidEnabled(presetName !== HearingLossGrade.NONE)
  setHearingAidGains(gains)
}
