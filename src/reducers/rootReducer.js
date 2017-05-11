import { combineReducers } from 'redux'

import haReducer from './ha.reducer.js'
import hlReducer from './hl.reducer.js'
import targetReducer from './target.reducer.js'

export default combineReducers({
  ha: haReducer,
  hl: hlReducer,
  target: targetReducer,
})
