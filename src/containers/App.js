/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import styled, { injectGlobal } from 'styled-components'

import store from 'src/store.js'
import SiteHeader from 'src/components/SiteHeader.js'
import HearingAidSimulatorContainer from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer from 'src/containers/MaskingSelectorContainer.js'
import PositionControllerContainer from 'src/containers/PositionControllerContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'
import { WHITE } from 'src/styles/colors.js'
import { ModuleBox } from 'src/styles/elements.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

injectGlobal`
  @font-face {
    font-family: 'PT-Sans';
    src:
      local('PT Sans'),
      local('PTSans-Regular'),
      url('/assets/fonts/PT_Sans-Web-Regular.ttf');
    font-style: normal;
    font-weight: normal;
    text-rendering: optimizeLegibility;
  }

  @font-face {
    font-family: 'PT-Sans';
    src:
      local('PT Sans Bold'),
      local('PTSans-Bold'),
      url('/assets/fonts/PT_Sans-Web-Bold.ttf');
    font-style: normal;
    font-weight: bold;
    text-rendering: optimizeLegibility;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f7f7f7;
    font-family: 'PT-Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
  }
`

const AppContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding-bottom: 32px;
`

const ContentPane = styled(GutteredElement)`
  width: 33.333%;
`

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <SiteHeader />

        <AppContent>
          <ContentPane>
            <ModuleBox>
              <TargetSelectorContainer />

              <PositionControllerContainer />
            </ModuleBox>
            <ModuleBox>
              <MaskingSelectorContainer />
            </ModuleBox>
          </ContentPane>

          <ContentPane>
            <ModuleBox>
              <HearingLossSimulatorContainer />
            </ModuleBox>
          </ContentPane>

          <ContentPane>
            <ModuleBox>
              <HearingAidSimulatorContainer />
            </ModuleBox>
          </ContentPane>
        </AppContent>
      </div>
    </Provider>
  )
}
