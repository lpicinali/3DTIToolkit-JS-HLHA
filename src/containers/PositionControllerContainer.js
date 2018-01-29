/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { round } from 'lodash'

import * as CustomPropTypes from 'src/prop-types.js'
import { setTargetPosition } from 'src/actions/controls.actions.js'
import ContainerDimensionsWithScrollUpdates from 'src/components/ContainerDimensionsWithScrollUpdates.js'
import PositionController from 'src/components/PositionController.js'
import { H3 } from 'src/styles/elements.js'

/**
 * Position Controller Container
 */
class PositionControllerContainer extends Component {
  static propTypes = {
    headRadius: PropTypes.number.isRequired,
    targetPosition: CustomPropTypes.position.isRequired,
    onTargetMove: PropTypes.func.isRequired,
  }

  render() {
    const { headRadius, targetPosition, onTargetMove } = this.props

    return (
      <div>
        <H3>
          Position (radius of 30 meters): {round(targetPosition.distance, 2)}m
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
      </div>
    )
  }
}

export default connect(
  state => ({
    headRadius: state.controls.headRadius,
    targetPosition: state.controls.targetPosition,
  }),
  dispatch => ({
    onTargetMove: position => dispatch(setTargetPosition(position)),
  })
)(PositionControllerContainer)
