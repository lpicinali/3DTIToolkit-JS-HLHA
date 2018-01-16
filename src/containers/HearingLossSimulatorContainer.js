import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import * as CustomPropTypes from 'src/prop-types.js'
import {
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
  setHlGrade,
} from 'src/actions/hl.actions.js'
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
    frequencySmearingPreset: CustomPropTypes.grade.isRequired,
    onFrequencySmearingChange: PropTypes.func.isRequired,
    temporalDistortionPreset: CustomPropTypes.grade.isRequired,
    onTemporalDistortionChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      grade,
      onGradeChange,
      frequencySmearingPreset,
      onFrequencySmearingChange,
      temporalDistortionPreset,
      onTemporalDistortionChange,
    } = this.props

    return (
      <div>
        <H2>Hearing Loss Simulator</H2>
        <H3>Select a grade of hearing loss</H3>
        <HearingLossGradeSelector grade={grade} onSelect={onGradeChange} />

        <H3>Frequency smearing</H3>
        <HearingLossGradeSelector
          grade={frequencySmearingPreset}
          onSelect={onFrequencySmearingChange}
        />

        <H3>Temporal distortion</H3>
        <HearingLossGradeSelector
          grade={temporalDistortionPreset}
          onSelect={onTemporalDistortionChange}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.hl.isEnabled,
    grade: state.hl.grade,
    frequencySmearingPreset: state.hl.frequencySmearingPreset,
    temporalDistortionPreset: state.hl.temporalDistortionPreset,
  }),
  dispatch => ({
    onGradeChange: grade => dispatch(setHlGrade(grade)),
    onFrequencySmearingChange: preset =>
      dispatch(setFrequencySmearingPreset(preset)),
    onTemporalDistortionChange: preset =>
      dispatch(setTemporalDistortionPreset(preset)),
  })
)(HearingAidSimulatorContainer)
