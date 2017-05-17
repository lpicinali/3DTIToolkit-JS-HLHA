import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduce } from 'lodash'

import { setTargetVolume } from 'src/actions/controls.actions.js'
import { setTarget } from 'src/actions/target.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'
import VolumeSlider from 'src/components/VolumeSlider.js'
import { H2, H3 } from 'src/styles/elements.js'

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

    const options = reduce(
      targets,
      (aggr, file) => ({
        ...aggr,
        [file.filename]: file.title,
      }),
      {}
    )

    console.log({ options })

    return (
      <div>
        <H2>Target</H2>

        <H3>Source</H3>
        <ButtonGroup
          options={options}
          value={target}
          isVertical
          onSelect={onSelect}
        />

        <H3>Volume</H3>
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
