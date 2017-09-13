import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'

import Slider from 'src/components/Slider.js'

const gainToDecibels = value => 20 * (0.43429 * Math.log(value))
const decibelsToGain = value => Math.exp(value / 8.6858)

/**
 * Volume Slider
 */
class VolumeSlider extends PureComponent {
  static propTypes = {
    volume: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  @autobind
  handleSliderChange(value) {
    this.props.onChange(decibelsToGain(value))
  }


  render() {
    const { volume } = this.props

    return (
      <Slider
        value={gainToDecibels(volume)}
        min={-40}
        max={20}
        step={1}
        onChange={this.handleSliderChange}
      />
    )
  }
}

export default VolumeSlider
