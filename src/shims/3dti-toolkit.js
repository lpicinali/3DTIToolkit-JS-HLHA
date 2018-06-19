/* global window */
const toolkit = window.AudioToolkit()

export default toolkit

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
  HRIR,
  HRIRVector,
  Logger,
  getLeftEarBuffer,
  HearingLossSim_Process,
  HearingAidSim_Process,
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
  HRIR,
  HRIRVector,
  Logger,
  getLeftEarBuffer,
  HearingLossSim_Process,
  HearingAidSim_Process,
}
