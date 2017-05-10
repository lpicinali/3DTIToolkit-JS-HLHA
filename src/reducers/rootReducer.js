import { combineReducers } from 'redux'

import haReducer from './ha.reducer.js'
import hlReducer from './hl.reducer.js'

export default combineReducers({
  ha: haReducer,
  hl: hlReducer,
})
