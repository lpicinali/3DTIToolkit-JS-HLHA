import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'

import { HearingLossGrade } from 'src/constants.js'
import {
  setDirectionalityValue,
  setDirectionalityEnabled,
} from 'src/actions/controls.actions.js'
import Slider from 'src/components/Slider.js'

const DirectionalityContainerWrapper = styled.div`
  ${props =>
    props.isEnablable === false &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `};
`

/**
 * Directionality Container
 */
class DirectionalityContainer extends PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    isEnablable: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChangeEnabled: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      isEnablable,
      value,
      onChangeEnabled,
      onChangeValue,
    } = this.props

    return (
      <DirectionalityContainerWrapper isEnablable={isEnablable}>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isEnabled && isEnablable}
              onChange={() => onChangeEnabled(!isEnabled)}
            />
            Enabled
          </label>
        </div>

        <div>
          <Slider
            isDisabled={isEnablable == true && isEnabled === false}
            value={value}
            min={-1}
            max={1}
            step={0.05}
            onChange={onChangeValue}
            minLabel="Omni-directional"
            maxLabel="Directional"
            showValue={false}
          />
        </div>
      </DirectionalityContainerWrapper>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.controls.isDirectionalityEnabled,
    isEnablable: state.ha.grade !== HearingLossGrade.NONE,
    value: state.controls.directionalityValue,
  }),
  dispatch => ({
    onChangeEnabled: isEnabled => dispatch(setDirectionalityEnabled(isEnabled)),
    onChangeValue: value => dispatch(setDirectionalityValue(value)),
  })
)(DirectionalityContainer)
