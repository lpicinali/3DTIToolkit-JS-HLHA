import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Ear } from 'src/constants.js'
import { setDirectionalityValue } from 'src/actions/controls.actions.js'
import Slider from 'src/components/Slider.js'
import { Disablable, Label, Pane, PaneSet } from 'src/styles/elements.js'

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
    onChangeValue: PropTypes.func.isRequired,
  }

  render() {
    const { isEnabled, isLinked, value, onChangeValue } = this.props

    return (
      <Disablable isDisabled={isEnabled === false}>
        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <Slider
              value={value[Ear.LEFT]}
              min={-1}
              max={1}
              step={0.05}
              onChange={newValue => onChangeValue(Ear.LEFT, newValue)}
              minLabel="Omni"
              maxLabel="Directional"
              showValue={false}
            />
          </Pane>

          <Pane isDisabled={isLinked}>
            <Label>Right ear</Label>
            <Slider
              value={value[Ear.RIGHT]}
              min={-1}
              max={1}
              step={0.05}
              onChange={newValue => onChangeValue(Ear.RIGHT, newValue)}
              minLabel="Omni"
              maxLabel="Directional"
              showValue={false}
            />
          </Pane>
        </PaneSet>
      </Disablable>
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
    onChangeValue: (ear, value) => dispatch(setDirectionalityValue(ear, value)),
  })
)(DirectionalityContainer)
