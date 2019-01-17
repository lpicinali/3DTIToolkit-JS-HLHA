import AudioToolkit from '@reactify/3dti-toolkit'

export default AudioToolkit

export const toolkit = AudioToolkit()

const {
  BinauralAPI,
  CCompressor,
  CEarPair_Mono,
  CHearingAidSim,
  CHearingLossSim,
  CListener,
  CMonoBuffer,
  CQuaternion,
  CSingleSourceDSP,
  CStereoBuffer,
  CTransform,
  CVector3,
  EarPairBuffers,
  T_ear,
  TSpatializationMode,
  FloatVector,
  Logger,
  getLeftEarBuffer,
  HearingLossSim_Process,
  HearingAidSim_Process,
  HRTF_CreateFrom3dti,
} = toolkit

export {
  BinauralAPI,
  CCompressor,
  CEarPair_Mono,
  CHearingAidSim,
  CHearingLossSim,
  CListener,
  CMonoBuffer,
  CQuaternion,
  CSingleSourceDSP,
  CStereoBuffer,
  CTransform,
  CVector3,
  EarPairBuffers,
  T_ear,
  TSpatializationMode,
  FloatVector,
  Logger,
  getLeftEarBuffer,
  HearingLossSim_Process,
  HearingAidSim_Process,
  HRTF_CreateFrom3dti,
}
