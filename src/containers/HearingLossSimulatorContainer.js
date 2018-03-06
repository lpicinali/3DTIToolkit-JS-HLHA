import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { Ear } from 'src/constants.js'
import * as CustomPropTypes from 'src/prop-types.js'
import {
  setFrequencySmearingPreset,
  setTemporalDistortionPreset,
  setHlGrade,
  setHlLinked,
} from 'src/actions/hl.actions.js'
import HearingLossGradeSelector from 'src/components/HearingLossGradeSelector.js'
import Toggle from 'src/components/Toggle.js'
import { H2, H3, Label, Pane, PaneSet } from 'src/styles/elements.js'

const LinkToggle = styled(Toggle)`
  margin: 24px 0 32px;
`

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    isLinked: PropTypes.bool.isRequired,
    onLinkedChange: PropTypes.func.isRequired,
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
      isLinked,
      onLinkedChange,
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

        <LinkToggle
          isChecked={isLinked}
          onChange={onLinkedChange}
          label="Link left and right ear"
        />

        <H3>Select a level of hearing loss</H3>
        <PaneSet numPanes={2}>
          <Pane>
            <Label>Left ear</Label>
            <HearingLossGradeSelector
              grade={grade[Ear.LEFT]}
              onSelect={newGrade => onGradeChange(Ear.LEFT, newGrade)}
            />
          </Pane>
          <Pane isDisabled={isLinked}>
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
          <Pane isDisabled={isLinked}>
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
          <Pane isDisabled={isLinked}>
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
    isLinked: state.hl.isLinked,
    grade: state.hl.grade,
    frequencySmearingPreset: state.hl.frequencySmearingPreset,
    temporalDistortionPreset: state.hl.temporalDistortionPreset,
  }),
  dispatch => ({
    onLinkedChange: isLinked => dispatch(setHlLinked(isLinked)),
    onGradeChange: (ear, grade) => dispatch(setHlGrade(ear, grade)),
    onFrequencySmearingChange: (ear, preset) =>
      dispatch(setFrequencySmearingPreset(ear, preset)),
    onTemporalDistortionChange: (ear, preset) =>
      dispatch(setTemporalDistortionPreset(ear, preset)),
  })
)(HearingAidSimulatorContainer)
