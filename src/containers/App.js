import React from 'react'
import { Provider } from 'react-redux'

import store from 'src/store.js'
import HearingAidSimulatorContainer
  from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer
  from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer
  from 'src/containers/MaskingSelectorContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'

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
