/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { clamp } from 'lodash'
import { autobind } from 'core-decorators'
import styled from 'styled-components'
import { transparentize } from 'polished'

import * as CustomPropTypes from 'src/prop-types.js'
import {
  BLACK,
  DARK_TURQUOISE,
  GRAY,
  TURQUOISE,
  WHITE_SMOKE,
} from 'src/styles/colors.js'

const MIN_DISTANCE = 0.1

const StyledPositionController = styled.div`
  position: relative;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background-color: ${WHITE_SMOKE};
  border: 1px solid ${BLACK};
  border-radius: 100%;
`

const DistanceCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  border-radius: 100%;
  border: 1px solid ${transparentize(0.85, GRAY)};

  &:nth-child(1) {
    width: ${(100 * Math.sqrt(5)) / Math.sqrt(30)}%;
    height: ${(100 * Math.sqrt(5)) / Math.sqrt(30)}%;
  }

  &:nth-child(2) {
    width: ${(100 * Math.sqrt(10)) / Math.sqrt(30)}%;
    height: ${(100 * Math.sqrt(10)) / Math.sqrt(30)}%;
  }

  &:nth-child(3) {
    width: ${(100 * Math.sqrt(15)) / Math.sqrt(30)}%;
    height: ${(100 * Math.sqrt(15)) / Math.sqrt(30)}%;
  }

  &:nth-child(4) {
    width: ${(100 * Math.sqrt(20)) / Math.sqrt(30)}%;
    height: ${(100 * Math.sqrt(20)) / Math.sqrt(30)}%;
  }

  &:nth-child(5) {
    width: ${(100 * Math.sqrt(25)) / Math.sqrt(30)}%;
    height: ${(100 * Math.sqrt(25)) / Math.sqrt(30)}%;
  }
`

const HeadCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size};
  height: ${props => props.size};
  background: ${BLACK};
  border-radius: 100%;
  transform: translate3d(-50%, -50%, 0);
`

const SourceHandle = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: ${TURQUOISE};
  border-radius: 10px;
  text-indent: -9999px;
  overflow: hidden;
  cursor: pointer;
  transform: translate3d(-50%, -50%, 0);
`

/**
 * Position Controller
 */
class PositionController extends Component {
  static propTypes = {
    bounds: CustomPropTypes.rect.isRequired,
    size: PropTypes.number,
    objects: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        azimuth: PropTypes.number.isRequired,
        distance: PropTypes.number.isRequired,
      })
    ).isRequired,
    headRadius: PropTypes.number.isRequired,
    onPositionChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    size: 30,
  }

  state = {
    isDragging: false,
    currentObjectId: null,
    position: { azimuth: 0, distance: 0 },
  }

  @autobind
  handlePress(objectId) {
    const object = this.props.objects.find(x => x.id === objectId)

    this.setState(() => ({
      isDragging: true,
      currentObjectId: objectId,
      position: { azimuth: object.azimuth, distance: object.distance },
    }))

    window.addEventListener('mousemove', this.handleDrag)
    window.addEventListener('mouseup', this.handleRelease)
  }

  @autobind
  handleDrag(evt) {
    const { bounds, size, onPositionChange } = this.props
    const { isDragging, currentObjectId } = this.state

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

      const newX =
        (constrainedMouseX - (window.scrollX + rect.left + rect.width / 2)) /
        (rect.width / 2)
      const newZ =
        (constrainedMouseY - (window.scrollY + rect.top + rect.height / 2)) /
        (rect.height / 2)

      const azimuth = Math.atan(-newZ / newX) + (newX < 0 ? Math.PI : 0)

      const expDistance = Math.sqrt(size) * Math.sqrt(newX ** 2 + newZ ** 2)
      const distance = clamp(expDistance ** 2, MIN_DISTANCE, size)

      const newPos = { azimuth, distance }

      this.setState({
        ...this.state,
        position: newPos,
      })

      onPositionChange(currentObjectId, newPos)
    }
  }

  @autobind
  handleRelease() {
    window.removeEventListener('mousemove', this.handleDrag)
    window.removeEventListener('mouseup', this.handleRelease)

    this.setState(() => ({
      ...this.state,
      isDragging: false,
      currentObjectId: null,
    }))
  }

  render() {
    const { bounds, size, objects, headRadius } = this.props

    // console.log('PositionController.render()', bounds.top)

    return (
      <StyledPositionController width={bounds.width} height={bounds.height}>
        <DistanceCircle />
        <DistanceCircle />
        <DistanceCircle />
        <DistanceCircle />
        <DistanceCircle />

        <HeadCircle
          size={`calc(${(100 * (headRadius / 0.5) * (size / 12)) /
            size}% + 6px)`}
        />

        {objects.map(object => (
          <SourceHandle
            key={object.id}
            style={{
              top: `${50 -
                50 *
                  ((Math.sin(object.azimuth) * Math.sqrt(object.distance)) /
                    Math.sqrt(size))}%`,
              left: `${50 +
                50 *
                  ((Math.cos(object.azimuth) * Math.sqrt(object.distance)) /
                    Math.sqrt(size))}%`,
            }}
            onMouseDown={() => this.handlePress(object.id)}
          >
            <span>{object.label}</span>
          </SourceHandle>
        ))}
      </StyledPositionController>
    )
  }
}

export default PositionController
