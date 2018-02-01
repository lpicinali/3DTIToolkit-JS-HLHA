/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import styled, { injectGlobal } from 'styled-components'

import store from 'src/store.js'
import HearingAidSimulatorContainer from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer from 'src/containers/MaskingSelectorContainer.js'
import PlaybackControlsContainer from 'src/containers/PlaybackControlsContainer.js'
import PositionControllerContainer from 'src/containers/PositionControllerContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'
import { BLUE } from 'src/styles/colors.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
`

const Header = styled.header`
  padding: 16px;
  background: ${BLUE};
  color: #fefefe;
`

const HeaderContent = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  font-size: 12px;
`

const Heading = styled.h1`
  margin: 0;
  font-size: 20px;
  line-height: 24px;
`

const AppContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding: 24px 16px;
`

const ContentPane = styled.div`
  width: 25%;
`

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Header>
          <HeaderContent>
            <div>3D Tune-In Toolkit Demo</div>
            <Heading>Hearing Loss & Hearing Aid</Heading>
          </HeaderContent>
        </Header>

        <AppContent>
          <PlaybackControlsContainer />

          <ContentPane>
            <TargetSelectorContainer />
            <PositionControllerContainer />
          </ContentPane>

          <ContentPane>
            <MaskingSelectorContainer />
          </ContentPane>

          <ContentPane>
            <HearingLossSimulatorContainer />
          </ContentPane>

          <ContentPane>
            <HearingAidSimulatorContainer />
          </ContentPane>
        </AppContent>
      </div>
    </Provider>
  )
}
