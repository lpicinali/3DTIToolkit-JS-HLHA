/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from 'src/prop-types.js'
import { setTargetPosition } from 'src/actions/controls.actions.js'
import ContainerDimensionsWithScrollUpdates from 'src/components/ContainerDimensionsWithScrollUpdates.js'
import PositionController from 'src/components/PositionController.js'

const BoundsRelay = rect => {}

/**
 * Position Controller Container
 */
class PositionControllerContainer extends Component {
  static propTypes = {
    targetPosition: CustomPropTypes.position.isRequired,
    onTargetMove: PropTypes.func.isRequired,
  }

  render() {
    const { targetPosition, onTargetMove } = this.props

    return (
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
              onPositionChange={(id, position) => onTargetMove(position)}
            />
          )}
        </ContainerDimensionsWithScrollUpdates>
      </div>
    )
  }
}

export default connect(
  state => ({
    targetPosition: state.controls.targetPosition,
  }),
  dispatch => ({
    onTargetMove: position => dispatch(setTargetPosition(position)),
  })
)(PositionControllerContainer)
