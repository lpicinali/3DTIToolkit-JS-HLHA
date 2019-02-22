import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { setHrtfInfoDismissed } from 'src/actions/alerts.actions.js'
import { setHrtf } from 'src/actions/hrtf.actions.js'
import hrtfFiles from 'src/audio/hrtf-files.js'
import Button from 'src/components/Button.js'
import { Caret, CaretDirection } from 'src/components/Caret.js'
import Select from 'src/components/Select.js'
import {
  Aligned,
  TooltipAnimation,
  TooltipBox,
  TooltipPosition,
} from 'src/components/Tooltip.js'
import { GRAY, WHITE_SMOKE } from 'src/styles/colors.js'
import { H3, P } from 'src/styles/elements.js'

const HrtfSelectorContainer = styled.div`
  position: relative;
  z-index: 100;
`

const WideSelect = styled(Select)`
  min-width: 100px;
`

const HrtfTooltipBackdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${transparentize(0.2, GRAY)};
  pointer-events: none;
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`

const HrtfTooltip = styled(Aligned)`
  z-index: 100;
  width: 320px;
`

const HrtfTooltipHeading = styled(H3)`
  margin-top: 0;
`

/**
 * Hrtf Selector
 */
class HrtfSelector extends PureComponent {
  static propTypes = {
    hrtfFilename: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    isTooltipVisible: PropTypes.bool.isRequired,
    onDismissTooltip: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hrtfFilename: null,
  }

  render() {
    const {
      hrtfFilename,
      onSelect,
      isTooltipVisible,
      onDismissTooltip,
    } = this.props

    const options = hrtfFiles.map(hrtfFile => ({
      value: hrtfFile.filename,
      label: hrtfFile.label,
    }))

    return (
      <HrtfSelectorContainer>
        <HrtfTooltipBackdrop isVisible={isTooltipVisible} />

        <WideSelect
          scope="HRTF"
          placeholder="Choose HRTF..."
          options={options}
          value={hrtfFilename}
          onChange={onSelect}
        />

        <TooltipAnimation
          isVisible={isTooltipVisible === true}
          transitionSize={-8}
        >
          <HrtfTooltip
            position={TooltipPosition.BOTTOM}
            alignment={{ x: TooltipPosition.CENTER }}
            offset={{ top: 16 }}
          >
            <Aligned
              position={TooltipPosition.TOP}
              alignment={{ x: TooltipPosition.CENTER }}
            >
              <Caret
                direction={CaretDirection.UP}
                size={16}
                color={WHITE_SMOKE}
                style={{
                  filter: 'drop-shadow(0 -1px 1px hsla(0, 0%, 0%, 0.05))',
                }}
              />
            </Aligned>

            <TooltipBox>
              <HrtfTooltipHeading>Using HRTFs</HrtfTooltipHeading>
              <P>
                Here you choose between different head-related transfer
                functions, or HRTFs. An HRTF determines how an ear receives a
                sound from a certain point in space.
              </P>
              <Button onClick={onDismissTooltip}>Got it</Button>
            </TooltipBox>
          </HrtfTooltip>
        </TooltipAnimation>
      </HrtfSelectorContainer>
    )
  }
}

export default connect(
  state => ({
    hrtfFilename: state.hrtf.hrtfFilename,
    isTooltipVisible:
      state.alerts.hasReadDisclaimer === true &&
      state.alerts.hasDismissedPresetInfo === true &&
      state.alerts.hasDismissedHrtfInfo === false,
  }),
  dispatch => ({
    onSelect: hrtfFilename => dispatch(setHrtf(hrtfFilename)),
    onDismissTooltip: () => dispatch(setHrtfInfoDismissed(true)),
  })
)(HrtfSelector)
