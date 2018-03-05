/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { round } from 'lodash'
import styled from 'styled-components'

import * as CustomPropTypes from 'src/prop-types.js'
import { circumferenceToRadius, radiusToCircumference } from 'src/utils.js'
import {
  setHeadRadius,
  setPerformanceModeEnabled,
  setTargetPosition,
} from 'src/actions/controls.actions.js'
import ContainerDimensionsWithScrollUpdates from 'src/components/ContainerDimensionsWithScrollUpdates.js'
import PositionController from 'src/components/PositionController.js'
import Slider from 'src/components/Slider.js'
import { WHITE_SMOKE } from 'src/styles/colors.js'
import { H3 } from 'src/styles/elements.js'

const Wrapper = styled.div`
  margin-top: 24px;
  margin-right: 16px;
  border-top: 1px solid ${WHITE_SMOKE};
`

const SplitPane = styled.div`
  display: flex;

  > div {
    padding-right: 16px;
  }
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

    return (
      <Wrapper>
        <H3>
          Target position (radius of 30 meters):{' '}
          {round(targetPosition.distance, 2)}m
        </H3>
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 200,
          }}
        >
          <ContainerDimensionsWithScrollUpdates scrollTarget={window}>
            {rect => (
              <PositionController
                bounds={rect}
                objects={[
                  {
                    id: 'target',
                    label: 'Target',
                    azimuth: targetPosition.azimuth,
                    distance: targetPosition.distance,
                  },
                ]}
                headRadius={headRadius}
                onPositionChange={(id, position) => onTargetMove(position)}
              />
            )}
          </ContainerDimensionsWithScrollUpdates>
        </div>

        <H3>Performance mode</H3>
        <input
          type="checkbox"
          checked={isPerformanceModeEnabled}
          onClick={() => onChangePerformanceMode(!isPerformanceModeEnabled)}
        />

        <H3>Head circumference</H3>
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
          formatDisplayValue={currentValue => `${round(100 * currentValue)} cm`}
        />
      </Wrapper>
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
