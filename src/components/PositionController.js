/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { clamp } from 'lodash'
import { autobind } from 'core-decorators'

import * as CustomPropTypes from 'src/prop-types.js'

/**
 * Position Controller
 */
class PositionController extends Component {
  static propTypes = {
    bounds: CustomPropTypes.rect.isRequired,
    objects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        azimuth: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
      })
    ).isRequired,
    onPositionChange: PropTypes.func.isRequired,
  }

  state = {
    isDragging: false,
    currentObjectId: null,
    position: { azimuth: 0, distance: 0 },
  }

  @autobind handlePress(objectId) {
    const object = this.props.objects.find(x => x.id === objectId)

    this.setState(() => ({
      isDragging: true,
      currentObjectId: objectId,
      position: { azimuth: object.azimuth, distance: object.distance },
    }))

    window.addEventListener('mousemove', this.handleDrag)
    window.addEventListener('mouseup', this.handleRelease)
  }

  @autobind handleDrag(evt) {
    const { bounds, onPositionChange } = this.props
    const { isDragging, currentObjectId, position } = this.state

    if (isDragging) {
      const rect = bounds

      const constrainedMouseX = clamp(
        evt.pageX,
        window.scrollX + rect.left,
        window.scrollX + rect.left + rect.width
      )
      const constrainedMouseY = clamp(
        evt.pageY,
        window.scrollY + rect.top,
        window.scrollY + rect.top + rect.height
      )

      let newX =
        (constrainedMouseX - (rect.left + rect.width / 2)) / (rect.width / 2)
      let newZ =
        (constrainedMouseY - (rect.top + rect.height / 2)) / (rect.height / 2)

      const azimuth = Math.atan(-newZ / newX) + (newX < 0 ? Math.PI : 0)
      const distance = Math.min(1, Math.sqrt(newX ** 2 + newZ ** 2))

      const newPos = { azimuth, distance }

      this.setState({
        ...this.state,
        position: newPos,
      })

      onPositionChange(currentObjectId, newPos)
    }
  }

  @autobind handleRelease() {
    window.removeEventListener('mousemove', this.handleDrag)
    window.removeEventListener('mouseup', this.handleRelease)

    this.setState(() => ({
      ...this.state,
      isDragging: false,
      currentObjectId: null,
    }))
  }

  render() {
    const { bounds, objects } = this.props

    return (
      <div
        style={{
          position: 'relative',
          width: bounds.width,
          height: bounds.height,
        }}
      >
        {objects.map(object => (
          <div
            key={object.id}
            style={{
              position: 'absolute',
              top: `${50 - 50 * (Math.sin(object.azimuth) * object.distance)}%`,
              left: `${50 + 50 * (Math.cos(object.azimuth) * object.distance)}%`,
              width: 10,
              height: 10,
              background: 'red',
              transform: 'translate3d(-50%, -50%, 0)',
            }}
            onMouseDown={() => this.handlePress(object.id)}
          >
            <span>{object.label}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default PositionController