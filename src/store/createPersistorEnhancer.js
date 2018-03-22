import persistState from 'redux-localstorage'

const STORAGE_KEY = '3dti_online_toolkit_1'

export default function createPersistorEnhancer() {
  return persistState(['alerts'], { key: STORAGE_KEY })
}
