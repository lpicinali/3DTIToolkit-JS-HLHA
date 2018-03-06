import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import styled from 'styled-components'

import { Ear, HearingLossGrade, QuantisationStep } from 'src/constants.js'
import * as CustomPropTypes from 'src/prop-types.js'
import {
  setHaEnabled,
  setHaLinked,
  setHaGrade,
  setHaNumNoiseBits,
  setQuantisationStepEnabled,
} from 'src/actions/ha.actions.js'
import HearingLossGradeSelector from 'src/components/HearingLossGradeSelector.js'
import Slider from 'src/components/Slider.js'
import { LabelPosition, Toggle } from 'src/components/Toggle.js'
import DirectionalityContainer from 'src/containers/DirectionalityContainer.js'
import {
  Disablable,
  H2,
  H3,
  Label,
  Pane,
  PaneSet,
} from 'src/styles/elements.js'

const ModuleToggle = styled(Toggle)`
  float: right;
  margin-top: 4px;
`

const LinkToggle = styled(Toggle)`
  margin: 24px 0 32px;
`

const QuantisationToggles = styled.div`
  margin-bottom: 16px;
`

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    onEnabledChange: PropTypes.func.isRequired,
    isLinked: PropTypes.bool.isRequired,
    onLinkedChange: PropTypes.func.isRequired,
    grade: CustomPropTypes.earGrades.isRequired,
    hearingLossGrade: CustomPropTypes.earGrades.isRequired,
    hearingAidNumNoiseBits: PropTypes.number.isRequired,
    isQuantisationBeforeEnabled: PropTypes.bool.isRequired,
    isQuantisationAfterEnabled: PropTypes.bool.isRequired,
    onGradeChange: PropTypes.func.isRequired,
    onQuantisationChange: PropTypes.func.isRequired,
    onNumNoiseBitsChange: PropTypes.func.isRequired,
  }

  render() {
    const {
      isEnabled,
      onEnabledChange,
      isLinked,
      onLinkedChange,
      grade,
      hearingLossGrade,
      isQuantisationBeforeEnabled,
      isQuantisationAfterEnabled,
      hearingAidNumNoiseBits,
      onGradeChange,
      onQuantisationChange,
      onNumNoiseBitsChange,
    } = this.props

    const allGrades = values(HearingLossGrade)
    const enabledGrades = {
      [Ear.LEFT]: allGrades.slice(
        0,
        allGrades.indexOf(hearingLossGrade[Ear.LEFT]) + 1
      ),
      [Ear.RIGHT]: allGrades.slice(
        0,
        allGrades.indexOf(hearingLossGrade[Ear.RIGHT]) + 1
      ),
    }

    return (
      <div>
        <ModuleToggle
          isChecked={isEnabled}
          onChange={onEnabledChange}
          label={isEnabled ? 'On' : 'Off'}
          labelPosition={LabelPosition.BEFORE}
        />

        <H2>Hearing aid simulator</H2>

        <Disablable isDisabled={isEnabled === false}>
          <LinkToggle
            isChecked={isLinked}
            onChange={onLinkedChange}
            label="Link left and right ear"
          />

          <H3>Set the hearing aid to compensate for a specific loss level</H3>
          <PaneSet numPanes={2}>
            <Pane>
              <Label>Left ear</Label>
              <HearingLossGradeSelector
                grade={grade[Ear.LEFT]}
                enabledGrades={enabledGrades[Ear.LEFT]}
                onSelect={newGrade => onGradeChange(Ear.LEFT, newGrade)}
              />
            </Pane>
            <Pane isDisabled={isLinked}>
              <Label>Right ear</Label>
              <HearingLossGradeSelector
                grade={grade[Ear.RIGHT]}
                enabledGrades={enabledGrades[Ear.RIGHT]}
                onSelect={newGrade => onGradeChange(Ear.RIGHT, newGrade)}
              />
            </Pane>
          </PaneSet>

          <H3>Directionality</H3>
          <DirectionalityContainer />

          <H3>Hearing aid quantisation</H3>
          <QuantisationToggles>
            <Toggle
              isChecked={isQuantisationBeforeEnabled}
              label="Before equalizer"
              onChange={() =>
                onQuantisationChange(
                  QuantisationStep.BEFORE,
                  !isQuantisationBeforeEnabled
                )
              }
            />

            <Toggle
              isChecked={isQuantisationAfterEnabled}
              label="After equalizer"
              onChange={() =>
                onQuantisationChange(
                  QuantisationStep.AFTER,
                  !isQuantisationAfterEnabled
                )
              }
            />
          </QuantisationToggles>

          <Slider
            min={6}
            max={16}
            step={1}
            onChange={onNumNoiseBitsChange}
            value={hearingAidNumNoiseBits}
            formatDisplayValue={value => `${value} bits`}
          />
        </Disablable>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.ha.isEnabled,
    isLinked: state.ha.isLinked,
    grade: state.ha.grade,
    hearingLossGrade: state.hl.grade,
    isQuantisationBeforeEnabled: state.ha.isQuantisationBeforeEnabled,
    isQuantisationAfterEnabled: state.ha.isQuantisationAfterEnabled,
    hearingAidNumNoiseBits: state.ha.numNoiseBits,
  }),
  dispatch => ({
    onEnabledChange: isEnabled => dispatch(setHaEnabled(isEnabled)),
    onLinkedChange: isLinked => dispatch(setHaLinked(isLinked)),
    onGradeChange: (ear, grade) => dispatch(setHaGrade(ear, grade)),
    onQuantisationChange: (step, isEnabled) =>
      dispatch(setQuantisationStepEnabled(step, isEnabled)),
    onNumNoiseBitsChange: numBits => dispatch(setHaNumNoiseBits(numBits)),
  })
)(HearingAidSimulatorContainer)
