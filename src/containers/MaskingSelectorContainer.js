import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'
import { autobind } from 'core-decorators'

import { setMaskVolume } from 'src/actions/controls.actions.js'
import { setMask } from 'src/actions/masking.actions.js'
import Select from 'src/components/Select.js'
import VolumeSlider from 'src/components/VolumeSlider.js'
import { H2, H3 } from 'src/styles/elements.js'

/**
 * Mask Selector Container
 */
class MaskSelectorContainer extends Component {
  static propTypes = {
    masks: PropTypes.object.isRequired,
    mask: PropTypes.string,
    volume: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChangeVolume: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mask: null,
  }

  @autobind
  handleSelect(newMask) {
    const { mask, onSelect } = this.props

    if (newMask === mask) {
      onSelect(null)
    } else {
      onSelect(newMask)
    }
  }

  render() {
    const { masks, mask, volume, onChangeVolume } = this.props

    const options = map(masks, ({ title }) => ({
      value: title,
      label: title,
    }))

    return (
      <div>
        <H2>Masking (diffuse)</H2>

        <H3>Source</H3>
        <Select
          onChange={this.handleSelect}
          options={options}
          placeholder="Select masking..."
          value={mask}
        />

        <H3>Volume</H3>
        <VolumeSlider volume={volume} onChange={onChangeVolume} />
      </div>
    )
  }
}

export default connect(
  state => ({
    masks: state.masking.masks,
    mask: state.masking.selected,
    volume: state.controls.maskVolume,
  }),
  dispatch => ({
    onSelect: mask => dispatch(setMask(mask)),
    onChangeVolume: volume => dispatch(setMaskVolume(volume)),
  })
)(MaskSelectorContainer)
