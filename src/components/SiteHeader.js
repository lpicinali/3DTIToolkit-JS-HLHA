import React, { PureComponent } from 'react'
import styled from 'styled-components'

import PlaybackControlsContainer from 'src/containers/PlaybackControlsContainer.js'
import { BLACK, GRAY, TURQUOISE } from 'src/styles/colors.js'
import { A } from 'src/styles/elements.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

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

const PlaybackControlsAligner = styled.div`
  margin-top: 64px;
`

class SiteHeader extends PureComponent {
  render() {
    return (
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
              </A>. A more complete set of test applications and interfaces for
              Mac and PC can be downloaded here. For more information about the
              project, visit{' '}
              <A href="http://3d-tune-in.eu">http://3d-tune-in.eu</A>.
            </Prologue>
          </HeadingArea>

          <HeaderSideArea>
            <PlaybackControlsAligner>
              <PlaybackControlsContainer />
            </PlaybackControlsAligner>
          </HeaderSideArea>
        </HeaderContent>
      </Header>
    )
  }
}

export default SiteHeader
