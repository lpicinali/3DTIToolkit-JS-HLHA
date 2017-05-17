import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from 'src/prop-types.js'
import { setHlGrade } from 'src/actions/hl.actions.js'
import HearingLossGradeSelector
  from 'src/components/HearingLossGradeSelector.js'
import { H2, P } from 'src/styles/elements.js'

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
        <H2>Hearing Loss Simulator</H2>
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
