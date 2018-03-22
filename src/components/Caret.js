import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'
import styled from 'styled-components'

export const CaretDirection = {
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  UP: 'UP',
}

const RATIO = 2

const getCaretPolygonPointsString = (direction, size) => {
  const long = size
  const short = size / RATIO
  if (direction === CaretDirection.UP) {
    return `0 ${short} ${long / 2} 0 ${long} ${short}`
  }

  return null
}

const CaretSvg = styled.svg`
  display: block;
`

/**
 * Caret
 */
export class Caret extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    direction: PropTypes.oneOf(values(CaretDirection)).isRequired,
    size: PropTypes.number,
  }

  static defaultProps = {
    color: null,
    size: 16,
  }

  render() {
    const { color, direction, size, ...props } = this.props

    const width =
      direction === CaretDirection.UP || direction === CaretDirection.DOWN
        ? size
        : size / RATIO
    const height =
      direction === CaretDirection.UP || direction === CaretDirection.DOWN
        ? size / RATIO
        : size

    return (
      <CaretSvg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        {...props}
      >
        <polygon
          points={getCaretPolygonPointsString(direction, size)}
          fill={color}
        />
      </CaretSvg>
    )
  }
}

export default Caret
