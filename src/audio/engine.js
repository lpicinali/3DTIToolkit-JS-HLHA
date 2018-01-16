// import decode from 'audio-decode'
import bufferToArrayBuffer from 'buffer-to-arraybuffer'
import got from 'got'
import { map } from 'lodash'

import {
  HearingLossGrade,
  SimulatorType,
  SonicComponent,
} from 'src/constants.js'
import { fetchAudioBuffer } from 'src/utils.js'
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
import decode from 'src/audio/decode.js'
import {
  setEnabled as setHearingAidEnabled,
  setGains as setHearingAidGains,
  setNumNoiseBits,
} from 'src/audio/hearingAidProcessor.js'
import {
  setGains as setHearingLossGains,
  setFrequencySmearingEnabled as setHearingLossFrequencySmearingEnabled,
} from 'src/audio/hearingLossProcessor.js'
import presets from 'src/audio/presets.js'

export const play = () => {
  console.log('play')
  startNodes()
}

export const pause = () => {
  console.log('pause')

  try {
    stopNodes()
  } catch (err) {
    console.log('could not stop nodes:')
    console.error(err)
  }
}

export const setTargetSource = url => {
  pause()

  return fetchAudioBuffer(url)
    .then(audioBuffer => {
      const node = createNode(audioBuffer)
      setTargetNode(node)
    })
    .catch(err => console.error(err))
}

export const setMaskSource = urls => {
  pause()

  return Promise.all(
    map(urls, (url, channel) => {
      return fetchAudioBuffer(url)
        .then(audioBuffer => {
          const node = createNode(audioBuffer)
          setMaskNode(node, channel)
        })
        .catch(err => console.error(err))
    })
  )
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

export const setPerformanceModeEnabled = isEnabled => {
  getInstance().then(spatializer => {
    spatializer.setPerformanceModeEnabled(isEnabled)
  })
}

export const setHeadRadius = radius => {
  getInstance().then(spatializer => {
    spatializer.setHeadRadius(radius)
  })
}

export const setDirectionalityEnabled = isEnabled => {
  getInstance().then(spatializer => {
    spatializer.setDirectionalityEnabled(isEnabled)
  })
}

export const setDirectionalityAttenuation = (ear, attenuation) => {
  getInstance().then(spatializer => {
    spatializer.setDirectionalityAttenuation(ear, attenuation)
  })
}

export const setHearingLossPreset = presetName => {
  const gains = presets[SimulatorType.LOSS][presetName]
  console.log('setHearingLossPreset', presetName, gains)

  setHearingLossGains(gains)
}

export const setFrequencySmearingEnabled = isEnabled => {
  setHearingLossFrequencySmearingEnabled(isEnabled)
}

export const setHearingAidPreset = presetName => {
  const gains = presets[SimulatorType.AID][presetName]
  console.log('setHearingAidPreset', presetName, gains)

  setHearingAidEnabled(presetName !== HearingLossGrade.NONE)
  setHearingAidGains(gains)
}

export const setHearingAidNumNoiseBits = numBits => {
  setNumNoiseBits(numBits)
}
