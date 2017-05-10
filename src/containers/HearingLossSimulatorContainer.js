import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from '../prop-types.js'
import { setHlGrade } from '../actions/hl.actions.js'
import HearingLossGradeSelector from '../components/HearingLossGradeSelector.js'

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    grade: CustomPropTypes.grade.isRequired,
    onGradeChange: PropTypes.func.isRequired,
  }

  render() {
    const { isEnabled, grade, onGradeChange } = this.props

    return (
      <div>
        <h2>Hearing Loss Simulator</h2>
        <HearingLossGradeSelector grade={grade} onSelect={onGradeChange} />
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.hl.isEnabled,
    grade: state.hl.grade,
  }),
  dispatch => ({
    onGradeChange: grade => dispatch(setHlGrade(grade)),
  })
)(HearingAidSimulatorContainer)
