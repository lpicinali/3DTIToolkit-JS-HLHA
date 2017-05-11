import React from 'react'
import { Provider } from 'react-redux'

import store from '../store.js'
import TargetSelectorContainer from './TargetSelectorContainer.js'
import HearingAidSimulatorContainer from './HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from './HearingLossSimulatorContainer.js'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <TargetSelectorContainer />
        <HearingAidSimulatorContainer />
        <HearingLossSimulatorContainer />
      </div>
    </Provider>
  )
}
