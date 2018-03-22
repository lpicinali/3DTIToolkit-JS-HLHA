import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { DARK_GRAY, GRAY } from 'src/styles/colors.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

const FooterWrapper = styled(GutteredElement.withComponent('footer'))`
  width: 100%;
  max-width: ${MAX_WIDTH}px;
  margin-top: 40px;
  margin-right: auto;
  margin-left: auto;
  color: ${DARK_GRAY};
  font-size: 12px;
`

const FooterContent = styled.div`
  display: flex;
  padding-top: 24px;
  padding-bottom: 64px;
  border-top: 1px solid ${GRAY};
`

const EuDisclaimer = styled.div`
  display: flex;
  width: 50%;
`

const EuFlagWrapper = styled.div``

const EuFlag = styled.img`
  display: block;
  width: 48px;
  height: 32px;
`

const EuDisclaimerText = styled.span`
  flex-grow: 1;
  margin-left: 16px;
`

const CopyrightStatement = styled.div`
  width: 50%;
  text-align: right;
`

/**
 * Site Footer
 */
class SiteFooter extends PureComponent {
  render() {
    return (
      <FooterWrapper>
        <FooterContent>
          <EuDisclaimer>
            <EuFlagWrapper>
              <EuFlag src="/assets/img/eu.svg" alt="" />
            </EuFlagWrapper>
            <EuDisclaimerText>
              This project has received funding from the European Union's
              Horizon 2020 research and innovation programme under grant
              agreement No 644051
            </EuDisclaimerText>
          </EuDisclaimer>

          <CopyrightStatement>
            Copyright Imperal College London 2017-2018
          </CopyrightStatement>
        </FooterContent>
      </FooterWrapper>
    )
  }
}

export default SiteFooter
