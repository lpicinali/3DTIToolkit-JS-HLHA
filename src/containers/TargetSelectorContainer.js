import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'

import { setTarget } from 'src/actions/target.actions.js'
import ButtonGroup from 'src/components/ButtonGroup.js'

/**
 * Target Selector Container
 */
class TargetSelectorContainer extends Component {
  static propTypes = {
    targets: PropTypes.object.isRequired,
    target: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    target: null,
  }

  render() {
    const { targets, target, onSelect } = this.props

    return (
      <div>
        <h2>Choose a target</h2>
        <ButtonGroup options={targets} value={target} onSelect={onSelect} />
      </div>
    )
  }
}

export default connect(
  state => ({
    targets: state.target.targets,
    target: state.target.selected,
  }),
  dispatch => ({
    onSelect: target => dispatch(setTarget(target)),
  })
)(TargetSelectorContainer)
