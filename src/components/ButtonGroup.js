import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import styled from 'styled-components'

import Button from 'src/components/Button.js'

const StyledButtonGroup = styled.div`
  button {
    display: ${props => (props.isVertical ? 'block' : 'inline-block')};
    margin: 0 8px 8px 0;
  }
`

/**
 * Button Group
 */
class ButtonGroup extends Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    isVertical: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: null,
    isVertical: false,
  }

  render() {
    const { options, value, isVertical, onSelect } = this.props

    return (
      <StyledButtonGroup isVertical={isVertical}>
        {map(options, (optionLabel, optionValue) => (
          <Button
            key={optionValue}
            isActive={optionValue === value}
            onClick={() => onSelect(optionValue)}
          >
            {optionLabel}
          </Button>
        ))}
      </StyledButtonGroup>
    )
  }
}

export default ButtonGroup
