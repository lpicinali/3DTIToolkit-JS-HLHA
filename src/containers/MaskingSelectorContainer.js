import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduce } from 'lodash'

import { setMaskVolume } from 'src/actions/controls.actions.js'
import { setMask } from 'src/actions/masking.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'
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

  render() {
    const { masks, mask, volume, onSelect, onChangeVolume } = this.props

    const options = reduce(
      masks,
      (aggr, file) => ({
        ...aggr,
        [file.title]: file.title,
      }),
      {}
    )

    return (
      <div>
        <H2>Masking</H2>

        <H3>Source</H3>
        <ButtonGroup
          options={options}
          enabledOptions={Object.keys(options)}
          value={mask}
          isVertical
          onSelect={onSelect}
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
