import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from 'src/prop-types.js'
import {
  setFrequencySmearingEnabled,
  setHlGrade,
} from 'src/actions/hl.actions.js'
import FrequencySmearingToggle from 'src/components/FrequencySmearingToggle.js'
import HearingLossGradeSelector from 'src/components/HearingLossGradeSelector.js'
import { H2, H3 } from 'src/styles/elements.js'

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    grade: CustomPropTypes.grade.isRequired,
    onGradeChange: PropTypes.func.isRequired,
    isFrequencySmearingEnabled: PropTypes.bool.isRequired,
    onChangeFrequencySmearing: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      grade,
      onGradeChange,
      isFrequencySmearingEnabled,
      onChangeFrequencySmearing,
    } = this.props

    return (
      <div>
        <H2>Hearing Loss Simulator</H2>
        <H3>Select a grade of hearing loss</H3>
        <HearingLossGradeSelector grade={grade} onSelect={onGradeChange} />
        <FrequencySmearingToggle
          isActive={isFrequencySmearingEnabled}
          onChange={onChangeFrequencySmearing}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.hl.isEnabled,
    grade: state.hl.grade,
    isFrequencySmearingEnabled: state.hl.isFrequencySmearingEnabled,
  }),
  dispatch => ({
    onGradeChange: grade => dispatch(setHlGrade(grade)),
    onChangeFrequencySmearing: isEnabled =>
      dispatch(setFrequencySmearingEnabled(isEnabled)),
  })
)(HearingAidSimulatorContainer)
