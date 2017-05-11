import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { noop, round } from 'lodash'
import { autobind } from 'core-decorators'

/**
 * Volume Slider
 */
class VolumeSlider extends Component {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    min: 0,
    max: 10,
  }

  @autobind handleChange(evt) {
    const { volume, onChange } = this.props
    const { value } = evt.target

    const numericValue = round(parseFloat(value), 2)

    if (Math.abs(numericValue - volume) >= 0.015) {
      onChange(numericValue)
    }
  }

  render() {
    const { volume, min, max, onChange } = this.props

    return (
      <div className="VolumeSlider">
        <input
          type="range"
          min={min}
          max={max}
          value={volume}
          step={(max - min) / 100}
          onInput={this.handleChange}
          onChange={noop}
        />
      </div>
    )
  }
}

export default VolumeSlider
