import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setDisclaimerRead } from 'src/actions/alerts.actions.js'
import Button from 'src/components/Button.js'
import { H3, ModuleBox, P } from 'src/styles/elements.js'
import { GutteredElement } from 'src/styles/grid.js'
import { MAX_WIDTH } from 'src/styles/layout.js'

const DisclaimerWrapper = styled.div`
  width: 66.6667%;
  max-width: ${MAX_WIDTH}px;
  margin: 24px auto 40px;

  ${H3} {
    margin-top: 0;
  }
`

/**
 * Disclaimer
 */
class Disclaimer extends PureComponent {
  static propTypes = {
    isRead: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  render() {
    const { isRead, onClose } = this.props

    if (isRead === true) {
      return null
    }

    return (
      <DisclaimerWrapper>
        <GutteredElement>
          <ModuleBox>
            <H3>Disclaimer</H3>
            <P>
              This demo might produce audio of very loud levels. It is up to you
              to make sure you take caution and keep your headphone volume low
              and so on and so forth.
            </P>
            <Button onClick={onClose}>
              Understood, don’t show me this again.
            </Button>
          </ModuleBox>
        </GutteredElement>
      </DisclaimerWrapper>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    onClose: () => dispatch(setDisclaimerRead(true)),
  })
)(Disclaimer)
