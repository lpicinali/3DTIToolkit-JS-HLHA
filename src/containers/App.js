import React from 'react'
import { Provider } from 'react-redux'

import store from 'src/store.js'
import HearingAidSimulatorContainer
  from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer
  from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer
  from 'src/containers/MaskingSelectorContainer.js'
import PlaybackControlsContainer
  from 'src/containers/PlaybackControlsContainer.js'
import PositionControllerContainer
  from 'src/containers/PositionControllerContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'

export default function App() {
  return (
    <Provider store={store}>
      <div style={{ display: 'flex' }}>
        <PlaybackControlsContainer />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flex: '0 1',
            padding: 10,
          }}
        >
          <TargetSelectorContainer />

          <h2>Target position (radius of 30 meters)</h2>
          <PositionControllerContainer />
        </div>

        <div style={{ flex: '1 0', padding: 10 }}>
          <MaskingSelectorContainer />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flex: '1 0',
            padding: 10,
          }}
        >
          <HearingLossSimulatorContainer />
          <HearingAidSimulatorContainer />

          <p style={{ color: 'red' }}>
            <strong>Be aware!</strong>
            {' '}
            Don't put the aid simulator's preset to anything higher than the loss simulator. It'll go loud!
          </p>
        </div>
      </div>
    </Provider>
  )
}
