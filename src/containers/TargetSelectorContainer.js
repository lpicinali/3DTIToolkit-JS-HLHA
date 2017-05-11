import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'

import { setTargetVolume } from 'src/actions/controls.actions.js'
import { setTarget } from 'src/actions/target.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'
import VolumeSlider from 'src/components/VolumeSlider.js'

/**
 * Target Selector Container
 */
class TargetSelectorContainer extends Component {
  static propTypes = {
    targets: PropTypes.object.isRequired,
    target: PropTypes.string,
    volume: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChangeVolume: PropTypes.func.isRequired,
  }

  static defaultProps = {
    target: null,
  }

  render() {
    const { targets, target, volume, onSelect, onChangeVolume } = this.props

    return (
      <div>
        <h2>Choose a target</h2>
        <ButtonGroup options={targets} value={target} onSelect={onSelect} />
        <VolumeSlider
          volume={volume}
          min={0}
          max={1}
          onChange={onChangeVolume}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    targets: state.target.targets,
    target: state.target.selected,
    volume: state.controls.targetVolume,
  }),
  dispatch => ({
    onSelect: target => dispatch(setTarget(target)),
    onChangeVolume: volume => dispatch(setTargetVolume(volume)),
  })
)(TargetSelectorContainer)
