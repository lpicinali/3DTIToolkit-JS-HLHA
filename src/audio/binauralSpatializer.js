import {
  BinauralAPI,
  CMonoBuffer,
  CStereoBuffer,
  CTransform,
  CVector3,
} from '3dti-toolkit'

import context from 'src/audio/context.js'
import { fetchHrirsVector } from 'src/audio/hrir.js'
import hrirUrls from 'src/audio/hrir-files.js'

const binauralApi = new BinauralAPI()

let instancePromise = null

let listener
let source

export function getInstance() {
  if (instancePromise !== null) {
    return instancePromise
  }

  instancePromise = createInstance()
  return instancePromise
}

function createInstance() {
  return fetchHrirsVector(hrirUrls, context).then(hrirsVector => {
    listener = binauralApi.CreateListener(hrirsVector, 0.0875)
    listener.SetListenerTransform(new CTransform())

    source = binauralApi.CreateSource()
    setSourcePosition(Math.PI - 2, 10)

    const inputMonoBuffer = new CMonoBuffer()
    inputMonoBuffer.resize(512, 0)

    const outputStereoBuffer = new CStereoBuffer()
    outputStereoBuffer.resize(1024, 0)

    const processor = context.createScriptProcessor(512, 2, 2)
    processor.onaudioprocess = audioProcessingEvent => {
      const { inputBuffer, outputBuffer } = audioProcessingEvent

      const inputData = inputBuffer.getChannelData(0)

      for (let i = 0; i < inputData.length; i++) {
        inputMonoBuffer.set(i, inputData[i])
      }

      // if (window.processBinaural === true) {
      source.ProcessAnechoic(listener, inputMonoBuffer, outputStereoBuffer)
      // }

      const outputDataLeft = outputBuffer.getChannelData(0)
      const outputDataRight = outputBuffer.getChannelData(1)

      for (let i = 0; i < outputDataLeft.length; i++) {
        outputDataLeft[i] = outputStereoBuffer.get(i * 2)
        outputDataRight[i] = outputStereoBuffer.get(i * 2 + 1)
      }
    }

    function setSourcePosition(azimuth, distance) {
      const transform = new CTransform()

      const x = Math.cos(azimuth) * distance
      const z = -Math.sin(azimuth) * distance
      const position = new CVector3(x, 0, z)

      transform.SetPosition(position)
      source.SetSourceTransform(transform)

      transform.delete()
    }

    return {
      listener,
      source,
      processor,
      setSourcePosition,
    }
  })
}
