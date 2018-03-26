/* eslint no-unused-expressions: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SettingsInfoToggle from 'src/components/SettingsInfoToggle.js'
import SiteFooter from 'src/components/SiteFooter.js'
import SiteHeader from 'src/components/SiteHeader.js'
import Disclaimer from 'src/containers/Disclaimer.js'
import GlobalPresetSelector from 'src/containers/GlobalPresetSelector.js'
import HearingAidSimulatorContainer from 'src/containers/HearingAidSimulatorContainer.js'
import HearingLossSimulatorContainer from 'src/containers/HearingLossSimulatorContainer.js'
import MaskingSelectorContainer from 'src/containers/MaskingSelectorContainer.js'
import PlaybackControlsContainer from 'src/containers/PlaybackControlsContainer.js'
import PositionControllerContainer from 'src/containers/PositionControllerContainer.js'
import TargetSelectorContainer from 'src/containers/TargetSelectorContainer.js'
import { Disablable, ModuleBox } from 'src/styles/elements.js'
import injectGlobalStyles from 'src/styles/globals.js'
import { GridContainer, GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

injectGlobalStyles()

const ControlsArea = styled(GridContainer.withComponent('aside'))`
  margin-top: 24px;
  margin-bottom: 24px;
`

const ControlsAreaContent = styled(GutteredElement)`
  display: flex;
  align-items: center;
`

const ControlsAreaComponent = styled.div`
  flex-shrink: 1;
  margin-left: 16px;
`

const ControlsAreaPlaybackComponent = styled.div`
  flex-grow: 1;
`

const AppContent = styled(Disablable)`
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

class App extends PureComponent {
  static propTypes = {
    hasReadDisclaimer: PropTypes.bool.isRequired,
  }

  render() {
    const { hasReadDisclaimer } = this.props

    return (
      <div>
        <SiteHeader />

        <Disclaimer isRead={hasReadDisclaimer} />

        <ControlsArea>
          <ControlsAreaContent>
            <ControlsAreaPlaybackComponent>
              <PlaybackControlsContainer />
            </ControlsAreaPlaybackComponent>

            <ControlsAreaComponent>
              <GlobalPresetSelector />
            </ControlsAreaComponent>
            <ControlsAreaComponent>
              <SettingsInfoToggle />
            </ControlsAreaComponent>
          </ControlsAreaContent>
        </ControlsArea>

        <AppContent isDisabled={hasReadDisclaimer === false}>
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

        <SiteFooter />
      </div>
    )
  }
}

export default connect(state => ({
  hasReadDisclaimer: state.alerts.hasReadDisclaimer,
}))(App)
