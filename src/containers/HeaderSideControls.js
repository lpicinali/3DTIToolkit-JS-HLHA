import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import * as Icon from 'react-feather'

import { Caret, CaretDirection } from 'src/components/Caret.js'
import {
  Aligned,
  TooltipAnimation,
  TooltipBox,
  TooltipPosition,
} from 'src/components/Tooltip.js'
// import MasterLevelMeter from 'src/containers/MasterLevelMeter.js'
import PlaybackControlsContainer from 'src/containers/PlaybackControlsContainer.js'
import { TURQUOISE, WHITE_SMOKE } from 'src/styles/colors.js'
import { H3, ModuleBox } from 'src/styles/elements.js'

const HeaderSideBox = styled(ModuleBox)`
  display: flex;
  padding: 0;
`

const PlaybackControlsWrapper = styled.div`
  flex-grow: 1;
  padding: 16px;
`

const SettingsWrapper = styled.div`
  position: relative;
`

const SettingsToggle = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 16px;
  background: ${darken(0.01, WHITE_SMOKE)};
  border-left: 1px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;

  &:hover {
    color: ${TURQUOISE};
  }

  > *:not(:first-child) {
    margin-left: 4px;
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

// const MasterLevelWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 16px;
//   background: ${darken(0.01, WHITE_SMOKE)};
//   border-left: 1px solid rgba(0, 0, 0, 0.03);
//   border-radius: 0 4px 4px 0;
// `

/**
 * Header Side Area
 */
class HeaderSideControls extends PureComponent {
  state = {
    isSettingsOpen: false,
  }

  render() {
    const { isSettingsOpen } = this.state

    return (
      <HeaderSideBox>
        <PlaybackControlsWrapper>
          <PlaybackControlsContainer />
        </PlaybackControlsWrapper>

        <SettingsWrapper>
          <SettingsToggle
            onClick={() => this.setState({ isSettingsOpen: !isSettingsOpen })}
          >
            <Icon.Settings size={20} />

            {isSettingsOpen === true ? (
              <Icon.ChevronUp size={18} />
            ) : (
              <Icon.ChevronDown size={18} />
            )}
          </SettingsToggle>

          <TooltipAnimation isVisible={isSettingsOpen} transitionSize={-8}>
            <SettingsTooltip
              position={TooltipPosition.BOTTOM}
              alignment={{ x: TooltipPosition.RIGHT }}
              offset={{ top: 16 }}
            >
              <Aligned
                position={TooltipPosition.TOP}
                alignment={{ x: TooltipPosition.RIGHT }}
                offset={{ left: -32 }}
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
                <SettingRow>
                  <SettingName>HRTF</SettingName>
                  <SettingValue>IRC_1032_C_R0195</SettingValue>
                </SettingRow>
              </TooltipBox>
            </SettingsTooltip>
          </TooltipAnimation>
        </SettingsWrapper>

        {/*<MasterLevelWrapper>
          <MasterLevelMeter />
        </MasterLevelWrapper>*/}
      </HeaderSideBox>
    )
  }
}

export default HeaderSideControls
