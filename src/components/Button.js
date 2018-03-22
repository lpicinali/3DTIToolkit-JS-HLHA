import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { lighten, transparentize } from 'polished'

import { TURQUOISE, WHITE } from 'src/styles/colors.js'

const StyledButton = styled.button`
  appearance: none;
  padding: 8px 16px;
  background: ${TURQUOISE};
  background-image: linear-gradient(to right, #5be1ff, ${TURQUOISE});
  border: none;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  cursor: pointer;
  color: ${WHITE};
  font-family: 'PT-Sans', sans-serif;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.15s;

  &:hover {
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.2),
      0 0 0 3px ${lighten(0.3, TURQUOISE)};
  }

  &:active {
    color: ${transparentize(0.2, WHITE)};
    box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.2),
      0 0 0 0 ${lighten(0.3, TURQUOISE)};
  }

  ${props =>
    props.disabled &&
    css`
      border-color: gray;
      color: gray;
      pointer-events: none;
    `};
`

/**
 * Button
 */
class Button extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool,
    isActive: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    isEnabled: true,
    isActive: false,
  }

  render() {
    const { isEnabled, isActive, onClick, children } = this.props

    return (
      <StyledButton
        disabled={isEnabled === false}
        className="Button"
        onClick={onClick}
        isActive={isActive}
      >
        {children}
      </StyledButton>
    )
  }
}

export default Button
