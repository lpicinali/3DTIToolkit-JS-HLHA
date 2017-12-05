import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import {
  setDirectionalityValue,
  setDirectionalityEnabled,
} from 'src/actions/controls.actions.js'
import Slider from 'src/components/Slider.js'
import { BLACK } from 'src/styles/colors.js'

const LeftRightLabels = styled.div`
  display: flex;
  color: ${BLACK};
  font-size: 10px;
  opacity: 0.5;

  > *:first-child {
    flex-grow: 1;
  }
`

/**
 * Directionality Container
 */
class DirectionalityContainer extends PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChangeEnabled: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  }

  render() {
    const { isEnabled, value, onChangeEnabled, onChangeValue } = this.props

    return (
      <div className="DirectionalityContainer">
        <div>
          <label>
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={() => onChangeEnabled(!isEnabled)}
            />
            Enabled
          </label>
        </div>

        <div>
          <Slider
            value={value}
            min={-1}
            max={1}
            step={0.05}
            onChange={onChangeValue}
          />
          <LeftRightLabels>
            <span>Omni-directional</span>
            <span>Directional</span>
          </LeftRightLabels>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.controls.isDirectionalityEnabled,
    value: state.controls.directionalityValue,
  }),
  dispatch => ({
    onChangeEnabled: isEnabled => dispatch(setDirectionalityEnabled(isEnabled)),
    onChangeValue: value => dispatch(setDirectionalityValue(value)),
  })
)(DirectionalityContainer)
