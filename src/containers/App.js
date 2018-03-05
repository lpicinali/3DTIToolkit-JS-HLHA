/* eslint no-unused-expressions: 0 */
import React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'

import store from 'src/store.js'
import SiteHeader from 'src/components/SiteHeader.js'
import HearingAidSimulatorContainer from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer from 'src/containers/MaskingSelectorContainer.js'
import PositionControllerContainer from 'src/containers/PositionControllerContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'
import { WHITE } from 'src/styles/colors.js'
import { ModuleBox } from 'src/styles/elements.js'
import injectGlobalStyles from 'src/styles/globals.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

injectGlobalStyles()

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

const MaskingModuleBox = styled(ModuleBox)`
  margin-top: 32px;
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
            <MaskingModuleBox>
              <MaskingSelectorContainer />
            </MaskingModuleBox>
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
