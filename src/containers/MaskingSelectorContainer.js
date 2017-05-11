import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'

import { setMask } from 'src/actions/masking.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'

/**
 * Mask Selector Container
 */
class MaskSelectorContainer extends Component {
  static propTypes = {
    masks: PropTypes.object.isRequired,
    mask: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    mask: null,
  }

  render() {
    const { masks, mask, onSelect } = this.props

    return (
      <div>
        <h2>Choose masking</h2>
        <ButtonGroup options={masks} value={mask} onSelect={onSelect} />
      </div>
    )
  }
}

export default connect(
  state => ({
    masks: state.masking.masks,
    mask: state.masking.selected,
  }),
  dispatch => ({
    onSelect: mask => dispatch(setMask(mask)),
  })
)(MaskSelectorContainer)
