import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'

import { setMaskVolume } from 'src/actions/controls.actions.js'
import { setMask } from 'src/actions/masking.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'
import VolumeSlider from 'src/components/VolumeSlider.js'

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

  render() {
    const { masks, mask, volume, onSelect, onChangeVolume } = this.props

    return (
      <div>
        <h2>Choose masking</h2>
        <ButtonGroup options={masks} value={mask} onSelect={onSelect} />
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
    masks: state.masking.masks,
    mask: state.masking.selected,
    volume: state.controls.maskVolume,
  }),
  dispatch => ({
    onSelect: mask => dispatch(setMask(mask)),
    onChangeVolume: volume => dispatch(setMaskVolume(volume)),
  })
)(MaskSelectorContainer)
