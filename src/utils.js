import bufferToArrayBuffer from 'buffer-to-arraybuffer'
import got from 'got'
import { round } from 'lodash'

import context from 'src/audio/context.js'
import decode from 'src/audio/decode.js'

export function circumferenceToRadius(circumference) {
  return circumference / (2 * Math.PI)
}

export function radiusToCircumference(radius) {
  return radius * 2 * Math.PI
}

export function fetchAudioBuffer(url) {
  return got(url, { encoding: null })
    .then(response => bufferToArrayBuffer(response.body))
    .then(arrayBuffer => decode(arrayBuffer, context))
}

export function cast(val, fromLower, fromUpper, toLower, toUpper) {
  if (toUpper === toLower) {
    return toUpper
  }

  return (
    (val - fromLower) * (toUpper - toLower) / (fromUpper - fromLower) + toLower
  )
}

export function roundPadded(number, precision = 0) {
  const rounded = round(number, precision)
  const str = String(rounded)
  return /\./.test(str) === true ? str : `${str}.${'0'.repeat(precision)}`
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
