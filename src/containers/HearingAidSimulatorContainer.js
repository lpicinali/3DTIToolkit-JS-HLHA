import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from 'src/prop-types.js'
import { setHaGrade } from 'src/actions/ha.actions.js'
import HearingLossGradeSelector
  from 'src/components/HearingLossGradeSelector.js'
import { H2, H3 } from 'src/styles/elements.js'

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
        <H2>Hearing Aid Simulator</H2>
        <H3>Select a grade of hearing aid to apply</H3>
        <HearingLossGradeSelector grade={grade} onSelect={onGradeChange} />
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.ha.isEnabled,
    grade: state.ha.grade,
  }),
  dispatch => ({
    onGradeChange: grade => dispatch(setHaGrade(grade)),
  })
)(HearingAidSimulatorContainer)
