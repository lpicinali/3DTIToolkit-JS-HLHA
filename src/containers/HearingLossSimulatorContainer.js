import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Ear } from 'src/constants.js'
import * as CustomPropTypes from 'src/prop-types.js'
import {
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
  setHlGrade,
} from 'src/actions/hl.actions.js'
import HearingLossGradeSelector from 'src/components/HearingLossGradeSelector.js'
import { H2, H3, Label, Pane, PaneSet } from 'src/styles/elements.js'

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    grade: CustomPropTypes.earGrades.isRequired,
    onGradeChange: PropTypes.func.isRequired,
    frequencySmearingPreset: CustomPropTypes.earGrades.isRequired,
    onFrequencySmearingChange: PropTypes.func.isRequired,
    temporalDistortionPreset: CustomPropTypes.earGrades.isRequired,
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
        <H2>Hearing loss simulator</H2>
        <H3>Select a level of hearing loss</H3>
        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <HearingLossGradeSelector
              grade={grade[Ear.LEFT]}
              onSelect={newGrade => onGradeChange(Ear.LEFT, newGrade)}
            />
          </Pane>
          <Pane>
            <Label>Right ear</Label>
            <HearingLossGradeSelector
              grade={grade[Ear.RIGHT]}
              onSelect={newGrade => onGradeChange(Ear.RIGHT, newGrade)}
            />
          </Pane>
        </PaneSet>

        <H3>Frequency smearing</H3>
        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <HearingLossGradeSelector
              grade={frequencySmearingPreset[Ear.LEFT]}
              onSelect={newGrade =>
                onFrequencySmearingChange(Ear.LEFT, newGrade)
              }
            />
          </Pane>
          <Pane>
            <Label>Right ear</Label>
            <HearingLossGradeSelector
              grade={frequencySmearingPreset[Ear.RIGHT]}
              onSelect={newGrade =>
                onFrequencySmearingChange(Ear.RIGHT, newGrade)
              }
            />
          </Pane>
        </PaneSet>

        <H3>Temporal distortion</H3>
        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <HearingLossGradeSelector
              grade={temporalDistortionPreset[Ear.LEFT]}
              onSelect={newGrade =>
                onTemporalDistortionChange(Ear.LEFT, newGrade)
              }
            />
          </Pane>
          <Pane>
            <Label>Right ear</Label>
            <HearingLossGradeSelector
              grade={temporalDistortionPreset[Ear.RIGHT]}
              onSelect={newGrade =>
                onTemporalDistortionChange(Ear.RIGHT, newGrade)
              }
            />
          </Pane>
        </PaneSet>
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
    onGradeChange: (ear, grade) => dispatch(setHlGrade(ear, grade)),
    onFrequencySmearingChange: (ear, preset) =>
      dispatch(setFrequencySmearingPreset(ear, preset)),
    onTemporalDistortionChange: (ear, preset) =>
      dispatch(setTemporalDistortionPreset(ear, preset)),
  })
)(HearingAidSimulatorContainer)
