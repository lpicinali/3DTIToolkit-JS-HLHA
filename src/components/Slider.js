import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { identity, round } from 'lodash'
import { autobind } from 'core-decorators'
import ReactSlider, { Handle } from 'rc-slider'
import styled, { css } from 'styled-components'

import { BLACK, DARK_GRAY, GRAY } from 'src/styles/colors.js'

const SliderWrapper = styled.div`
  position: relative;
`

const StyledSlider = styled(ReactSlider)`
  position: relative;
  height: 12px;
  padding: 4px 0;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`

const StyledHandle = styled(({ isDragging, ...props }) => (
  <Handle {...props} />
))`
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background: ${BLACK};
  border-radius: 100%;
  box-shadow: 0 0 0 0 ${BLACK};
  transform: translate3d(-50%, -50%, 0);
  transition: box-shadow 0.1s;

  ${props =>
    props.isDragging === false &&
    css`
      &:hover {
        box-shadow: 0 0 0 2px ${BLACK};
      }
    `};
`

const SliderLabels = styled.div`
  display: flex;
  padding: 4px 2px 0;
`

const SliderLabel = styled.span`
  flex-grow: 1;
  font-size: 12px;
  color: ${DARK_GRAY};

  &:last-child {
    text-align: right;
  }
`

const SliderValue = styled.span`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  color: ${BLACK};
  font-size: 12px;
  font-weight: bold;
`

/**
 * Slider
 */
class Slider extends Component {
  static propTypes = {
    formatDisplayValue: PropTypes.func,
    isDisabled: PropTypes.bool,
    max: PropTypes.number,
    maxLabel: PropTypes.string,
    min: PropTypes.number,
    minLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    showLabels: PropTypes.bool,
    showValue: PropTypes.bool,
    step: PropTypes.number,
    value: PropTypes.number.isRequired,
  }

  static defaultProps = {
    formatDisplayValue: identity,
    isDisabled: false,
    max: 10,
    maxLabel: null,
    min: 0,
    minLabel: null,
    showLabels: true,
    showValue: true,
    step: null,
  }

  @autobind
  handleChange(newValue) {
    const { value, step, onChange } = this.props

    if (Math.abs(newValue - value) >= step) {
      onChange(newValue)
    }
  }

  render() {
    const {
      formatDisplayValue,
      isDisabled,
      max,
      maxLabel,
      min,
      minLabel,
      showLabels,
      showValue,
      step,
      value,
    } = this.props

    return (
      <SliderWrapper>
        <StyledSlider
          disabled={isDisabled}
          min={min}
          max={max}
          value={value}
          step={step !== null ? step : (max - min) / 100}
          onChange={this.handleChange}
          handle={({ value, index, dragging, ...props }) => (
            <StyledHandle isDragging={dragging} value={value} {...props} />
          )}
          railStyle={{ height: 4, borderRadius: 4, background: GRAY }}
          trackStyle={{
            position: 'absolute',
            top: 4,
            left: 0,
            height: 4,
            borderRadius: 4,
            background: BLACK,
          }}
        />

        {showLabels === true && (
          <SliderLabels>
            <SliderLabel>{minLabel !== null ? minLabel : min}</SliderLabel>
            <SliderLabel>{maxLabel !== null ? maxLabel : max}</SliderLabel>
          </SliderLabels>
        )}

        {showValue && <SliderValue>{formatDisplayValue(value)}</SliderValue>}
      </SliderWrapper>
    )
  }
}

export default Slider
