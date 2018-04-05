import { combineReducers } from 'redux'

import alertsReducer from 'src/reducers/alerts.reducer.js'
import controlsReducer from 'src/reducers/controls.reducer.js'
import haReducer from 'src/reducers/ha.reducer.js'
import hlReducer from 'src/reducers/hl.reducer.js'
import maskingReducer from 'src/reducers/masking.reducer.js'
import presetsReducer from 'src/reducers/presets.reducer.js'
import prompterReducer from 'src/reducers/prompter.reducer.js'
import targetReducer from 'src/reducers/target.reducer.js'

export default combineReducers({
  alerts: alertsReducer,
  controls: controlsReducer,
  ha: haReducer,
  hl: hlReducer,
  masking: maskingReducer,
  presets: presetsReducer,
  prompter: prompterReducer,
  target: targetReducer,
})
