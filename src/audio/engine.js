import { SimulatorType } from 'src/constants.js'
import presets from 'src/audio/presets.js'

export const play = () => {
  console.log('play')
}

export const pause = () => {
  console.log('pause')
}

export const setComponentVolume = (id, volume) => {
  console.log('setComponentVolume', { id, volume })
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
