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
import { BLACK, GRAY, TURQUOISE, WHITE } from 'src/styles/colors.js'
import { A } from 'src/styles/elements.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f7f7f7;
    font-family: 'Roboto', sans-serif;
  }
`

const Header = styled.header`
  padding-top: 32px;
  padding-bottom: 24px;
  border-top: 2px solid ${TURQUOISE};
`

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  font-size: 12px;
`

const HeadingArea = styled(GutteredElement)`
  width: 66.6667%;
`

const HeaderSideArea = styled(GutteredElement)`
  width: 33.3333%;
`

const Heading = styled.h1`
  margin: 0;
  color: ${BLACK};
  font-size: 24px;
  line-height: 32px;
`

const SubHeading = styled.div`
  color: ${GRAY};
  font-size: 14px;
  line-height: 20px;
`

const Prologue = styled.p`
  margin: 16px 0;
  font-size: 14px;
  line-height: 20px;
`

const AppContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  padding-bottom: 32px;
`

const ContentPane = styled.div`
  width: 33.333%;
  padding: 0 12px;
`

const ModuleBox = styled.div`
  margin-bottom: 32px;
  padding: 16px 24px;
  background: ${WHITE};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
`

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Header>
          <HeaderContent>
            <HeadingArea>
              <Heading>
                Binaural Spatialisation, Hearing Loss & Hearing Aid
              </Heading>
              <SubHeading>from 3D Tune-In</SubHeading>

              <Prologue>
                This is a web-based interface for the 3D Tune-In Toolkit. The 3D
                Tune-In Toolkit is available open-source{' '}
                <A href="https://github.com/3DTune-In/3dti_AudioToolkit">
                  on GitHub
                </A>. A more complete set of test applications and interfaces
                for Mac and PC can be downloaded here. For more information
                about the project, visit{' '}
                <A href="http://3d-tune-in.eu">http://3d-tune-in.eu</A>.
              </Prologue>
            </HeadingArea>

            <HeaderSideArea>{/* Player controls */}</HeaderSideArea>
          </HeaderContent>
        </Header>

        <AppContent>
          <PlaybackControlsContainer />

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
