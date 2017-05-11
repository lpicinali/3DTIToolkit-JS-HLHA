import React from 'react'
import { Provider } from 'react-redux'

import store from '../store.js'
import HearingAidSimulatorContainer from './HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from './HearingLossSimulatorContainer.js'
import MaskingSelectorContainer from './MaskingSelectorContainer.js'
import TargetSelectorContainer from './TargetSelectorContainer.js'

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <TargetSelectorContainer />
        <MaskingSelectorContainer />
        <HearingAidSimulatorContainer />
        <HearingLossSimulatorContainer />
      </div>
    </Provider>
  )
}
