import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { BLACK, DARK_GRAY, GRAY, TURQUOISE } from 'src/styles/colors.js'
import { A } from 'src/styles/elements.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

const Header = styled.header`
  position: relative;
  z-index: 1000;
  padding-top: 32px;
  padding-bottom: 24px;
  background: linear-gradient(to bottom right, #fdfdfd, #fafafa);
  border-top: 2px solid ${TURQUOISE};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin: 0 auto;
  font-size: 12px;
`

const HeadingArea = styled(GutteredElement)`
  width: 50%;
`

const Heading = styled.h1`
  margin: 0;
  color: ${BLACK};
  font-size: 24px;
  line-height: 32px;
`

const SubHeading = styled.div`
  color: ${DARK_GRAY};
  font-size: 14px;
  line-height: 24px;
`

const HeaderSideArea = styled(GutteredElement)`
  width: 50%;
`

const Prologue = styled.p`
  margin: 0 0 16px;
  color: ${DARK_GRAY};
  font-size: 12px;
  line-height: 16px;
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
          </HeadingArea>

          <HeaderSideArea>
            <Prologue>
              This is a web-based interface for the 3D Tune-In Toolkit. The 3D
              Tune-In Toolkit is available open-source{' '}
              <A href="https://github.com/3DTune-In/3dti_AudioToolkit">
                on GitHub
              </A>
              . A more complete set of test applications and interfaces for Mac
              and PC can be downloaded here. For more information about the
              project, visit{' '}
              <A href="http://3d-tune-in.eu">http://3d-tune-in.eu</A>.
            </Prologue>
          </HeaderSideArea>
        </HeaderContent>
      </Header>
    )
  }
}

export default SiteHeader
