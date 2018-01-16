/* eslint import/prefer-default-export: 0 */
import {
  BinauralAPI,
  CMonoBuffer,
  CStereoBuffer,
  CTransform,
  CVector3,
  T_ear,
  TSpatializationMode,
} from '3dti-toolkit'
import { map } from 'lodash'

import { Ear } from 'src/constants.js'
import context from 'src/audio/context.js'
import { fetchHrirsVector } from 'src/audio/hrir.js'
import hrirUrls from 'src/audio/hrir-files.js'

const binauralApi = new BinauralAPI()

let instancePromise = null

let listener
let source
let maskLeft
let maskRight

function setPosition(target, azimuth, distance) {
  const transform = new CTransform()

  const x = Math.cos(azimuth) * distance
  const z = -Math.sin(azimuth) * distance
  const position = new CVector3(x, 0, z)

  transform.SetPosition(position)
  target.SetSourceTransform(transform)

  transform.delete()
}

function createInstance() {
  return fetchHrirsVector(hrirUrls, context).then(hrirsVector => {
    function setSourcePosition(azimuth, distance) {
      setPosition(source, azimuth, distance)
    }

    function setPerformanceModeEnabled(isEnabled) {
      map([source, maskLeft, maskRight], target =>
        target.SetSpatializationMode(
          isEnabled
            ? TSpatializationMode.HighPerformance
            : TSpatializationMode.HighQuality
        )
      )
    }

    function setHeadRadius(radius) {
      listener.SetHeadRadius(radius)
    }

    function setDirectionalityEnabled(isEnabled) {
      if (isEnabled === true) {
        listener.EnableDirectionality(T_ear.LEFT)
        listener.EnableDirectionality(T_ear.RIGHT)
      } else {
        listener.DisableDirectionality(T_ear.LEFT)
        listener.DisableDirectionality(T_ear.RIGHT)
      }
    }

    function setDirectionalityAttenuation(ear, attenuation) {
      if (ear === Ear.LEFT) {
        listener.SetDirectionality_dB(T_ear.LEFT, attenuation)
      } else if (ear === Ear.RIGHT) {
        listener.SetDirectionality_dB(T_ear.RIGHT, attenuation)
      }
    }

    listener = binauralApi.CreateListener(hrirsVector, 0.0875)
    listener.SetListenerTransform(new CTransform())
    listener.EnableDirectionality(T_ear.LEFT)
    listener.EnableDirectionality(T_ear.RIGHT)

    // Customized ITD is required for the HighPerformance mode to work
    listener.EnableCustomizedITD()

    source = binauralApi.CreateSource()
    setSourcePosition(Math.PI / 2, 30)

    const inputMonoBuffer = new CMonoBuffer()
    inputMonoBuffer.resize(512, 0)

    const outputStereoBuffer = new CStereoBuffer()
    outputStereoBuffer.resize(1024, 0)

    const processor = context.createScriptProcessor(512, 1, 2)
    processor.onaudioprocess = audioProcessingEvent => {
      const { inputBuffer, outputBuffer } = audioProcessingEvent

      const inputData = inputBuffer.getChannelData(0)

      for (let i = 0; i < inputData.length; i++) {
        inputMonoBuffer.set(i, inputData[i])
      }

      // if (window.processBinaural === true) {
      source.ProcessAnechoic(inputMonoBuffer, outputStereoBuffer)
      // }

      const outputDataLeft = outputBuffer.getChannelData(0)
      const outputDataRight = outputBuffer.getChannelData(1)

      for (let i = 0; i < outputDataLeft.length; i++) {
        outputDataLeft[i] = outputStereoBuffer.get(i * 2)
        outputDataRight[i] = outputStereoBuffer.get(i * 2 + 1)
      }
    }

    const masks = [Ear.LEFT, Ear.RIGHT].reduce((aggr, channel) => {
      const maskSource = binauralApi.CreateSource()
      const azimuth = channel === Ear.LEFT ? Math.PI : 0
      setPosition(maskSource, azimuth, 3)

      const maskInputBuffer = new CMonoBuffer()
      maskInputBuffer.resize(512, 0)
      const maskOutputBuffer = new CStereoBuffer()
      maskOutputBuffer.resize(1024, 0)

      const maskProcessor = context.createScriptProcessor(512, 2, 2)
      maskProcessor.onaudioprocess = audioProcessingEvent => {
        const { inputBuffer, outputBuffer } = audioProcessingEvent

        const inputData = inputBuffer.getChannelData(0)

        for (let i = 0; i < inputData.length; i++) {
          maskInputBuffer.set(i, inputData[i])
        }

        maskSource.ProcessAnechoic(maskInputBuffer, maskOutputBuffer)

        const outputDataLeft = outputBuffer.getChannelData(0)
        const outputDataRight = outputBuffer.getChannelData(1)

        for (let i = 0; i < outputDataLeft.length; i++) {
          outputDataLeft[i] = maskOutputBuffer.get(i * 2)
          outputDataRight[i] = maskOutputBuffer.get(i * 2 + 1)
        }
      }

      return {
        ...aggr,
        [channel]: {
          source: maskSource,
          processor: maskProcessor,
        },
      }
    }, {})

    return {
      listener,
      source,
      processor,
      masks,
      setSourcePosition,
      setPerformanceModeEnabled,
      setHeadRadius,
      setDirectionalityEnabled,
      setDirectionalityAttenuation,
    }
  })
}

export function getInstance() {
  if (instancePromise !== null) {
    return instancePromise
  }

  instancePromise = createInstance()
  return instancePromise
}
