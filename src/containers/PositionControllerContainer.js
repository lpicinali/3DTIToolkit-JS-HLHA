/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { round } from 'lodash'
import styled from 'styled-components'

import * as CustomPropTypes from 'src/prop-types.js'
import {
  circumferenceToRadius,
  radiusToCircumference,
  roundPadded,
} from 'src/utils.js'
import {
  setHeadRadius,
  setPerformanceModeEnabled,
  setTargetPosition,
} from 'src/actions/controls.actions.js'
import ContainerDimensionsWithScrollUpdates from 'src/components/ContainerDimensionsWithScrollUpdates.js'
import PositionController from 'src/components/PositionController.js'
import Slider from 'src/components/Slider.js'
import Toggle from 'src/components/Toggle.js'
import { BLACK, DARK_GRAY, WHITE_SMOKE } from 'src/styles/colors.js'
import { H3, Label } from 'src/styles/elements.js'

const SplitPane = styled.div`
  display: flex;
`

const Pane = styled.div`
  width: 50%;

  &:not(:first-child) {
    padding-left: 16px;
  }
`

const PositionControllerWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
`

const PositionControllerSquare = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const PositionValues = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 12px;
`

const PositionValueWrap = styled.div`
  margin-right: 16px;
  color: ${DARK_GRAY};
`

const PositionValue = styled.span`
  color: ${BLACK};
  font-weight: bold;
`

const PositionSetting = styled.div`
  margin-bottom: 16px;
`

/**
 * Position Controller Container
 */
class PositionControllerContainer extends Component {
  static propTypes = {
    headRadius: PropTypes.number.isRequired,
    isPerformanceModeEnabled: PropTypes.bool.isRequired,
    targetPosition: CustomPropTypes.position.isRequired,
    onChangePerformanceMode: PropTypes.func.isRequired,
    onChangeHeadRadius: PropTypes.func.isRequired,
    onTargetMove: PropTypes.func.isRequired,
  }

  render() {
    const {
      headRadius,
      isPerformanceModeEnabled,
      targetPosition,
      onChangePerformanceMode,
      onChangeHeadRadius,
      onTargetMove,
    } = this.props

    const { azimuth, distance } = targetPosition

    const x = Math.cos(azimuth)
    const y = Math.sin(azimuth)

    return (
      <div>
        <H3>Positioning</H3>
        <SplitPane>
          <Pane>
            <Label>X/Z position</Label>
            <PositionControllerWrapper>
              <PositionControllerSquare>
                <ContainerDimensionsWithScrollUpdates scrollTarget={window}>
                  {rect => (
                    <PositionController
                      bounds={rect}
                      objects={[
                        {
                          id: 'target',
                          label: 'Target',
                          azimuth,
                          distance,
                        },
                      ]}
                      headRadius={headRadius}
                      onPositionChange={(id, position) =>
                        onTargetMove(position)
                      }
                    />
                  )}
                </ContainerDimensionsWithScrollUpdates>
              </PositionControllerSquare>
            </PositionControllerWrapper>

            <PositionValues>
              <PositionValueWrap>
                x:{' '}
                <PositionValue>{roundPadded(x * distance, 1)} m</PositionValue>
              </PositionValueWrap>
              <PositionValueWrap>
                z:{' '}
                <PositionValue>{roundPadded(y * distance, 1)} m</PositionValue>
              </PositionValueWrap>
            </PositionValues>
          </Pane>

          <Pane>
            <PositionSetting>
              <Label>Head circumference</Label>
              <Slider
                min={0.4}
                max={0.7}
                step={0.005}
                value={radiusToCircumference(headRadius)}
                onChange={circumference =>
                  onChangeHeadRadius(circumferenceToRadius(circumference))
                }
                minLabel="40 cm"
                maxLabel="70 cm"
                formatDisplayValue={currentValue =>
                  `${round(100 * currentValue)} cm`
                }
              />
            </PositionSetting>

            <PositionSetting>
              <Label>High performance (low quality)</Label>
              <Toggle
                isChecked={isPerformanceModeEnabled}
                onChange={onChangePerformanceMode}
                showLabel={false}
              />
            </PositionSetting>
          </Pane>
        </SplitPane>
      </div>
    )
  }
}

export default connect(
  state => ({
    headRadius: state.controls.headRadius,
    isPerformanceModeEnabled: state.controls.isPerformanceModeEnabled,
    targetPosition: state.controls.targetPosition,
  }),
  dispatch => ({
    onChangeHeadRadius: radius => dispatch(setHeadRadius(radius)),
    onChangePerformanceMode: isEnabled =>
      dispatch(setPerformanceModeEnabled(isEnabled)),
    onTargetMove: position => dispatch(setTargetPosition(position)),
  })
)(PositionControllerContainer)
