import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Frequency Smearing Toggle
 */
class FrequencySmearingToggle extends PureComponent {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { isActive, onChange } = this.props

    return (
      <div className="FrequencySmearingToggle">
        <input
          type="checkbox"
          checked={isActive}
          onClick={() => onChange(!isActive)}
        />
        Frequency smearing
      </div>
    )
  }
}

export default FrequencySmearingToggle
