import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Ear } from 'src/constants.js'
import {
  setDirectionalityAttenuation,
  setDirectionalityEnabled,
} from 'src/actions/controls.actions.js'
import Slider from 'src/components/Slider.js'

/**
 * Directionality Container
 */
class DirectionalityContainer extends PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    attenuationLeft: PropTypes.number.isRequired,
    attenuationRight: PropTypes.number.isRequired,
    onChangeEnabled: PropTypes.func.isRequired,
    onChangeAttenuation: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      attenuationLeft,
      attenuationRight,
      onChangeEnabled,
      onChangeAttenuation,
    } = this.props

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
          Left attenuation
          <Slider
            value={attenuationLeft}
            min={-20}
            max={20}
            step={0.1}
            onChange={value => onChangeAttenuation(Ear.LEFT, value)}
          />
        </div>

        <div>
          Right attenuation
          <Slider
            value={attenuationRight}
            min={-20}
            max={20}
            step={0.1}
            onChange={value => onChangeAttenuation(Ear.RIGHT, value)}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.controls.isDirectionalityEnabled,
    attenuationLeft: state.controls.directionalityAttenuationLeft,
    attenuationRight: state.controls.directionalityAttenuationRight,
  }),
  dispatch => ({
    onChangeEnabled: isEnabled => dispatch(setDirectionalityEnabled(isEnabled)),
    onChangeAttenuation: (ear, attenuation) =>
      dispatch(setDirectionalityAttenuation(ear, attenuation)),
  })
)(DirectionalityContainer)
