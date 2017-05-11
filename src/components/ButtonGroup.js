import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map } from 'lodash'

import Button from './Button.js'

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
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    value: null,
  }

  render() {
    const { options, value, onSelect } = this.props

    return (
      <div className="ButtonGroup">
        {map(options, (optionLabel, optionValue) => (
          <Button
            key={optionValue}
            isActive={optionValue === value}
            onClick={() => onSelect(optionValue)}
          >
            {optionLabel}
          </Button>
        ))}
      </div>
    )
  }
}

export default ButtonGroup
