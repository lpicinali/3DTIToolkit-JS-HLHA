import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { autobind } from 'core-decorators'
import { fromGain, toGain } from 'decibels'
import styled from 'styled-components'
import * as Icon from 'react-feather'

import Slider from 'src/components/Slider.js'

const VolumeSliderWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SliderWidthWrapper = styled.div`
  flex-grow: 1;
  margin-left: 8px;
`

const VolumeIcon = ({ volume }) => {
  if (volume < 0.01) {
    return <Icon.Volume />
  } else if (volume < 0.25) {
    return <Icon.Volume1 />
  } else {
    return <Icon.Volume2 />
  }
}

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
    this.props.onChange(toGain(value))
  }

  render() {
    const { volume } = this.props

    return (
      <VolumeSliderWrapper>
        <VolumeIcon volume={volume} />

        <SliderWidthWrapper>
          <Slider
            value={fromGain(volume)}
            min={-40}
            max={20}
            step={1}
            onChange={this.handleSliderChange}
            showLabels={false}
            showValue={false}
          />
        </SliderWidthWrapper>
      </VolumeSliderWrapper>
    )
  }
}

export default VolumeSlider
