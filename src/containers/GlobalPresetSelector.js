import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { transparentize } from 'polished'
import { keys, values } from 'lodash'

import { GlobalPreset } from 'src/constants.js'
import { setPresetInfoDismissed } from 'src/actions/alerts.actions.js'
import { setGlobalPreset } from 'src/actions/presets.actions.js'
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

const SelectorWrapper = styled.div`
  position: relative;
  z-index: 100;
`

const PresetTooltipBackdrop = styled.div`
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

const WideSelect = styled(Select)`
  min-width: 280px;
`

const PresetTooltip = styled(Aligned)`
  z-index: 100;
  width: 320px;
`

const PresetTooltipHeading = styled(H3)`
  margin-top: 0;
`

/**
 * Global Preset Selector
 */
class GlobalPresetSelector extends PureComponent {
  static propTypes = {
    preset: PropTypes.oneOf(values(GlobalPreset)).isRequired,
    isTooltipVisible: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onDismissTooltip: PropTypes.func.isRequired,
  }

  render() {
    const { preset, isTooltipVisible, onChange, onDismissTooltip } = this.props

    return (
      <SelectorWrapper>
        <PresetTooltipBackdrop isVisible={isTooltipVisible} />

        <WideSelect
          scope="Preset"
          value={preset}
          placeholder="Choose a preset..."
          options={[
            {
              value: GlobalPreset.MILD_HEARING_LOSS,
              label: 'Mild hearing loss',
            },
            {
              value: GlobalPreset.MONOLATERAL_MILD_HEARING_LOSS,
              label: 'Monolateral mild hearing loss',
            },
            {
              value: GlobalPreset.MILD_HEARING_LOSS_WITH_HEARING_AID,
              label: 'Mild hearing loss with hearing aid',
            },
            {
              value: GlobalPreset.MODERATE_HEARING_LOSS_WITH_DISTORTION,
              label: 'Moderate hearing loss with distortion',
            },
            {
              value:
                GlobalPreset.MODERATE_HEARING_LOSS_WITH_DISTORTION_AND_HEARING_AID,
              label: 'Moderate hearing loss with distortion and hearing aid',
            },
          ]}
          onChange={onChange}
        />

        <TooltipAnimation
          isVisible={isTooltipVisible === true}
          transitionSize={-8}
        >
          <PresetTooltip
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
              <PresetTooltipHeading>Using presets</PresetTooltipHeading>
              <P>
                If you want to quickly try out different hearing loss and
                hearing aid simulations, you can choose between a couple of
                presets.
              </P>
              <Button onClick={onDismissTooltip}>Understood</Button>
            </TooltipBox>
          </PresetTooltip>
        </TooltipAnimation>
      </SelectorWrapper>
    )
  }
}

export default connect(
  state => ({
    preset: state.presets.preset,
    isTooltipVisible:
      state.alerts.hasDismissedPresetInfo === false &&
      state.alerts.hasReadDisclaimer === true,
  }),
  dispatch => ({
    onChange: preset => dispatch(setGlobalPreset(preset)),
    onDismissTooltip: () => dispatch(setPresetInfoDismissed(true)),
  })
)(GlobalPresetSelector)
