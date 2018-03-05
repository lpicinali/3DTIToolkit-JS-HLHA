import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { autobind } from 'core-decorators'
import styled from 'styled-components'

import { setTargetVolume } from 'src/actions/controls.actions.js'
import { setTarget } from 'src/actions/target.actions.js'
import Select from 'src/components/Select.js'
import VolumeSlider from 'src/components/VolumeSlider.js'
import { H2, H3 } from 'src/styles/elements.js'

const SourceWrapper = styled.div`
  display: flex;
  align-items: center;

  > * {
    width: 50%;
  }

  > *:not(:first-child) {
    padding-left: 16px;
  }
`

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

  @autobind
  handleSelect(newTarget) {
    const { target, onSelect } = this.props

    if (newTarget === target) {
      onSelect(null)
    } else {
      onSelect(newTarget)
    }
  }

  render() {
    const { targets, target, volume, onChangeVolume } = this.props

    const options = map(targets, ({ filename, title }) => ({
      value: filename,
      label: title,
    }))

    return (
      <div>
        <H2>Target</H2>

        <H3>Source</H3>
        <SourceWrapper>
          <Select
            onChange={this.handleSelect}
            options={options}
            placeholder="Select target..."
            value={target}
          />

          <VolumeSlider volume={volume} onChange={onChangeVolume} />
        </SourceWrapper>
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
