import StartAudioContext from 'startaudiocontext'

const AudioContext = window.AudioContext || window.webkitAudioContext
const context = new AudioContext()

StartAudioContext(context)

export default context
