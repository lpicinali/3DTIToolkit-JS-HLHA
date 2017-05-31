import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import VolumeSlider from 'src/components/VolumeSlider.js'

const NoiseBitSliderWrap = styled.div`
  display: flex;
`

/**
 * Noise Bit Slider
 */
class NoiseBitSlider extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { value, onChange } = this.props

    return (
      <NoiseBitSliderWrap>
        <VolumeSlider
          min={1}
          max={16}
          step={1}
          volume={value}
          onChange={onChange}
        />

        <output>{value}</output>
      </NoiseBitSliderWrap>
    )
  }
}

export default NoiseBitSlider