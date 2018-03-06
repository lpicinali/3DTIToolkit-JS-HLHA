import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Ear } from 'src/constants.js'
import {
  setDirectionalityValue,
  setDirectionalityEnabled,
} from 'src/actions/controls.actions.js'
import Slider from 'src/components/Slider.js'
import Toggle from 'src/components/Toggle.js'
import { Label, Pane, PaneSet } from 'src/styles/elements.js'

/**
 * Directionality Container
 */
class DirectionalityContainer extends PureComponent {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    isLinked: PropTypes.bool.isRequired,
    value: PropTypes.shape({
      [Ear.LEFT]: PropTypes.number.isRequired,
      [Ear.RIGHT]: PropTypes.number.isRequired,
    }).isRequired,
    onChangeEnabled: PropTypes.func.isRequired,
    onChangeValue: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      isLinked,
      value,
      onChangeEnabled,
      onChangeValue,
    } = this.props

    return (
      <div>
        <Toggle
          isChecked={isEnabled}
          onChange={onChangeEnabled}
          label={isEnabled ? 'On' : 'Off'}
        />

        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <Slider
              isDisabled={isEnabled === false}
              value={value[Ear.LEFT]}
              min={-1}
              max={1}
              step={0.05}
              onChange={newValue => onChangeValue(Ear.LEFT, newValue)}
              minLabel="Omni-directional"
              maxLabel="Directional"
              showValue={false}
            />
          </Pane>

          <Pane isDisabled={isLinked}>
            <Label>Right ear</Label>
            <Slider
              isDisabled={isEnabled === false}
              value={value[Ear.RIGHT]}
              min={-1}
              max={1}
              step={0.05}
              onChange={newValue => onChangeValue(Ear.RIGHT, newValue)}
              minLabel="Omni-directional"
              maxLabel="Directional"
              showValue={false}
            />
          </Pane>
        </PaneSet>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.controls.isDirectionalityEnabled,
    isLinked: state.ha.isLinked,
    value: state.controls.directionalityValue,
  }),
  dispatch => ({
    onChangeEnabled: isEnabled => dispatch(setDirectionalityEnabled(isEnabled)),
    onChangeValue: (ear, value) => dispatch(setDirectionalityValue(ear, value)),
  })
)(DirectionalityContainer)
