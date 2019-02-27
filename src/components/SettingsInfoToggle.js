import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as Icon from 'react-feather'

import { Caret, CaretDirection } from 'src/components/Caret.js'
import {
  Aligned,
  TooltipAnimation,
  TooltipBox,
  TooltipPosition,
} from 'src/components/Tooltip.js'
import { TURQUOISE, WHITE_SMOKE } from 'src/styles/colors.js'
import { H3, ModuleBox } from 'src/styles/elements.js'

const SettingsWrapper = styled.div`
  position: relative;
`

const SettingsToggle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px 8px 16px 16px;
  cursor: pointer;

  &:hover {
    color: ${TURQUOISE};
  }
`

const SettingsToggleLabel = styled.span`
  margin-left: 8px;
`

const SettingsToggleChevron = styled.span`
  margin-left: 8px;

  svg {
    vertical-align: middle;
  }
`

const SettingsTooltip = styled(Aligned)`
  z-index: 100;
  width: 320px;
`

const TooltipHeading = styled(H3)`
  margin-top: 0;
`

const SettingRow = styled.div`
  display: flex;
  margin-bottom: 8px;

  > * {
    flex-grow: 1;
  }
`

const SettingName = styled.span``

const SettingValue = styled.span`
  font-weight: bold;
  text-align: right;
`

/**
 * Settings Info Toggle
 */
class SettingsInfoToggle extends PureComponent {
  state = {
    isSettingsOpen: false,
  }

  render() {
    const { isSettingsOpen } = this.state

    return (
      <SettingsWrapper>
        <SettingsToggle
          onClick={() => this.setState({ isSettingsOpen: !isSettingsOpen })}
        >
          <Icon.Settings size={20} />
          <SettingsToggleLabel>Configurations</SettingsToggleLabel>
          <SettingsToggleChevron>
            {isSettingsOpen === true ? (
              <Icon.ChevronUp size={18} />
            ) : (
              <Icon.ChevronDown size={18} />
            )}
          </SettingsToggleChevron>
        </SettingsToggle>

        <TooltipAnimation isVisible={isSettingsOpen} transitionSize={-8}>
          <SettingsTooltip
            position={TooltipPosition.BOTTOM}
            alignment={{ x: TooltipPosition.RIGHT }}
            offset={{ top: 8 }}
          >
            <Aligned
              position={TooltipPosition.TOP}
              alignment={{ x: TooltipPosition.RIGHT }}
              offset={{ left: -72 }}
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
              <TooltipHeading>Current settings</TooltipHeading>

              <SettingRow>
                <SettingName>Sample rate</SettingName>
                <SettingValue>44100 Hz</SettingValue>
              </SettingRow>
              <SettingRow>
                <SettingName>Frame size</SettingName>
                <SettingValue>512 bytes</SettingValue>
              </SettingRow>
              <SettingRow>
                <SettingName>Interpolation</SettingName>
                <SettingValue>Enabled</SettingValue>
              </SettingRow>
              <SettingRow>
                <SettingName>Resampling step</SettingName>
                <SettingValue>{'5°'}</SettingValue>
              </SettingRow>
            </TooltipBox>
          </SettingsTooltip>
        </TooltipAnimation>
      </SettingsWrapper>
    )
  }
}

export default SettingsInfoToggle
