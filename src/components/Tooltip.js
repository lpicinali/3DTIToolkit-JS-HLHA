/* global window */
/* eslint react/no-multi-comp: 0 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-motion-ui-pack'
import { isNumber, values } from 'lodash'
import styled from 'styled-components'

import * as CustomPropTypes from 'src/prop-types.js'
import { ModuleBox } from 'src/styles/elements.js'

// Constants

export const TooltipPosition = {
  TOP: 'TOP',
  RIGHT: 'RIGHT',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  CENTER: 'CENTER',
}

// Helpers

const resovleBoxSizing = sizing => {
  const sizingObj =
    typeof sizing === 'number'
      ? { top: sizing, right: sizing, bottom: sizing, left: sizing }
      : sizing

  return {
    top: isNumber(sizingObj.top) ? sizingObj.top : 0,
    right: isNumber(sizingObj.right) ? sizingObj.right : 0,
    bottom: isNumber(sizingObj.bottom) ? sizingObj.bottom : 0,
    left: isNumber(sizingObj.left) ? sizingObj.left : 0,
  }
}

const getStylesAligningTo = (bounds, position, alignment, offset) => {
  const offsets = resovleBoxSizing(offset)

  const cssPosition = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  }

  const translate = {
    x: 0,
    y: 0,
  }

  if (position === TooltipPosition.LEFT) {
    cssPosition.right =
      window.innerWidth - bounds.left - (offset.left + offset.right)
  } else if (position === TooltipPosition.RIGHT) {
    cssPosition.left = bounds.left + bounds.width + offset.left + offset.right
  } else {
    if (alignment.x === TooltipPosition.LEFT) {
      cssPosition.left = bounds.left + offset.left + offset.right
    } else if (alignment.x === TooltipPosition.CENTER) {
      cssPosition.left =
        bounds.left + bounds.width / 2 + offset.left + offset.right
      translate.x = '-50%'
    } else if (alignment.x === TooltipPosition.RIGHT) {
      cssPosition.right =
        window.innerWidth - bounds.right - offset.left + offset.right
    }
  }

  if (position === TooltipPosition.TOP) {
    cssPosition.top = bounds.top + offsets.top + offsets.bottom
    translate.y = '-100%'
  } else if (position === TooltipPosition.BOTTOM) {
    cssPosition.top = bounds.top + bounds.height + offsets.top + offsets.bottom
  } else {
    if (alignment.y === TooltipPosition.TOP) {
      cssPosition.top = bounds.top + offsets.top + offsets.bottom
    } else if (alignment.y === TooltipPosition.CENTER) {
      cssPosition.top =
        bounds.top + bounds.height / 2 + offsets.top + offset.bottom
      translate.y = '-50%'
    } else if (alignment.y === TooltipPosition.BOTTOM) {
      cssPosition.top = bounds.top + bounds.height + offsets.top + offset.bottom
      translate.y = '-100%'
    }
  }

  return {
    position: cssPosition,
    translate,
  }
}

const getStylesRelativeTo = (position, alignment, offset) => {
  const offsets = resovleBoxSizing(offset)

  const cssPosition = {
    top: 'auto',
    right: 'auto',
    bottom: 'auto',
    left: 'auto',
  }

  const translate = {
    x: `${offsets.left + offsets.right}px`,
    y: `${offsets.top + offsets.bottom}px`,
  }

  if (position === TooltipPosition.LEFT) {
    cssPosition.right = `100%`
  } else if (position === TooltipPosition.RIGHT) {
    cssPosition.left = '100%'
  } else {
    if (alignment.x === TooltipPosition.LEFT) {
      cssPosition.left = 0
    } else if (alignment.x === TooltipPosition.CENTER) {
      cssPosition.left = '50%'
      translate.x = `calc(-50% + ${offsets.left + offsets.right}px)`
    } else if (alignment.x === TooltipPosition.RIGHT) {
      cssPosition.right = 0
    }
  }

  if (position === TooltipPosition.TOP) {
    cssPosition.bottom = '100%'
  } else if (position === TooltipPosition.BOTTOM) {
    cssPosition.top = '100%'
  } else {
    if (alignment.y === TooltipPosition.TOP) {
      cssPosition.top = 0
    } else if (alignment.y === TooltipPosition.CENTER) {
      cssPosition.top = '50%'
      translate.y = `calc(-50% ${offsets.top + offsets.bottom})`
    } else if (alignment.y === TooltipPosition.BOTTOM) {
      cssPosition.bottom = 0
    }
  }

  return {
    position: cssPosition,
    translate,
  }
}

// Prop types

const positionPropType = PropTypes.oneOf(values(TooltipPosition))
const alignmentPropType = PropTypes.shape({
  x: positionPropType,
  y: positionPropType,
})

// Styled elements

const AlignedWrap = styled.div`
  position: absolute;
`

export const TooltipBox = styled(ModuleBox)`
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 14px;
`

/**
 * Aligned
 */
export class Aligned extends PureComponent {
  static propTypes = {
    bounds: CustomPropTypes.rect,
    position: positionPropType,
    alignment: alignmentPropType,
    offset: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.shape({
        top: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
      }),
    ]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    style: PropTypes.shape({}),
  }

  static defaultProps = {
    bounds: null,
    position: TooltipPosition.TOP,
    alignment: {
      x: TooltipPosition.LEFT,
      y: TooltipPosition.TOP,
    },
    offset: 0,
    className: '',
    style: {},
  }

  render() {
    const {
      bounds,
      position,
      alignment,
      offset,
      children,
      className,
      style,
    } = this.props

    const styles = bounds
      ? getStylesAligningTo(
          bounds,
          position,
          alignment,
          resovleBoxSizing(offset)
        )
      : getStylesRelativeTo(position, alignment, resovleBoxSizing(offset))

    return (
      <AlignedWrap
        className={className}
        style={{
          ...style,
          top: styles.position.top,
          right: styles.position.right,
          bottom: styles.position.bottom,
          left: styles.position.left,
          transform: `translate3d(${styles.translate.x}, ${
            styles.translate.y
          }, 0)`,
        }}
      >
        {children}
      </AlignedWrap>
    )
  }
}

/**
 * Tooltip Animation
 */
export class TooltipAnimation extends PureComponent {
  static propTypes = {
    alignment: alignmentPropType,
    children: PropTypes.node,
    isVisible: PropTypes.bool.isRequired,
    transitionSize: PropTypes.number,
  }

  static defaultProps = {
    alignment: {},
    children: null,
    transitionSize: 40,
  }

  render() {
    const { alignment, children, isVisible, transitionSize } = this.props

    const resolvedAlignment = {
      ...Aligned.defaultProps.alignment,
      ...alignment,
    }

    return (
      <Transition
        component={false}
        appear={{
          opacity: 0,
          marginTop:
            resolvedAlignment.y === TooltipPosition.TOP
              ? transitionSize
              : -transitionSize,
        }}
        enter={{ opacity: 1, marginTop: 0 }}
        leave={{ opacity: 0, marginTop: 0 }}
      >
        {isVisible && React.cloneElement(children, { key: 'tooltip' })}
      </Transition>
    )
  }
}
