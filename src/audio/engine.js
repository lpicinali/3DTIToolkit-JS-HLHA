import { map } from 'lodash'

import { SimulatorType, SonicComponent } from 'src/constants.js'
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
import {
  setGains as setHearingAidGains,
  setNumNoiseBits,
} from 'src/audio/hearingAidProcessor.js'
import {
  setGains as setHearingLossGains,
  setFrequencySmearingPreset as setHearingLossFrequencySmearingPreset,
  setTemporalDistortionPreset as setHearingLossTemporalDistortionPreset,
} from 'src/audio/hearingLossProcessor.js'
import presets from 'src/audio/presets.js'

export const play = () => {
  startNodes()
}

export const pause = () => {
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
  if (id === SonicComponent.TARGET) {
    setTargetVolume(volume)
  } else if (id === SonicComponent.MASK) {
    setMaskVolume(volume)
  }
}

export const setComponentPosition = (id, { azimuth, distance, elevation }) => {
  if (id === SonicComponent.TARGET) {
    getInstance().then(spatializer => {
      spatializer.setSourcePosition(azimuth, distance, elevation)
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

export const setHearingLossPreset = (ear, presetName) => {
  const gains = presets[SimulatorType.LOSS][presetName]

  setHearingLossGains(ear, gains)
}

export const setFrequencySmearingPreset = (ear, preset) => {
  setHearingLossFrequencySmearingPreset(ear, preset)
}

export const setTemporalDistortionPreset = (ear, preset) => {
  setHearingLossTemporalDistortionPreset(ear, preset)
}

export const setHearingAidPreset = (ear, presetName) => {
  const gains = presets[SimulatorType.LOSS][presetName]
  setHearingAidGains(ear, gains)
}

export const setHearingAidNumNoiseBits = numBits => {
  setNumNoiseBits(numBits)
}
