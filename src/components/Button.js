import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      <button
        disabled={isEnabled === false}
        className="Button"
        onClick={onClick}
        style={{ backgroundColor: isActive ? 'blue' : 'silver' }}
      >
        {children}
      </button>
    )
  }
}

export default Button
