import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import styled from 'styled-components'

import { HearingLossGrade, QuantisationStep } from 'src/constants.js'
import * as CustomPropTypes from 'src/prop-types.js'
import {
  setHaGrade,
  setHaNumNoiseBits,
  setQuantisationStepEnabled,
} from 'src/actions/ha.actions.js'
import HearingLossGradeSelector from 'src/components/HearingLossGradeSelector.js'
import NoiseBitSlider from 'src/components/NoiseBitSlider.js'
import DirectionalityContainer from 'src/containers/DirectionalityContainer.js'
import { H2, H3, Label } from 'src/styles/elements.js'

const DirectionalityWrapper = styled.div`
  width: 130px;
`

/**
 * Hearing Aid Simulator Container
 */
class HearingAidSimulatorContainer extends Component {
  static propTypes = {
    isEnabled: PropTypes.bool.isRequired,
    grade: CustomPropTypes.grade.isRequired,
    hearingLossGrade: CustomPropTypes.grade.isRequired,
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
    const enabledGrades = allGrades.slice(
      0,
      allGrades.indexOf(hearingLossGrade) + 1
    )

    return (
      <div>
        <H2>Hearing Aid Simulator</H2>

        <H3>Select a grade of hearing aid to apply</H3>
        <HearingLossGradeSelector
          grade={grade}
          enabledGrades={enabledGrades}
          onSelect={onGradeChange}
        />

        <H3>Hearing Aid Quantisation - bits</H3>
        <div>
          <Label>
            <input
              type="checkbox"
              checked={isQuantisationBeforeEnabled}
              onChange={() =>
                onQuantisationChange(
                  QuantisationStep.BEFORE,
                  !isQuantisationBeforeEnabled
                )
              }
            />
            Before equalizer
          </Label>
          <Label>
            <input
              type="checkbox"
              checked={isQuantisationAfterEnabled}
              onChange={() =>
                onQuantisationChange(
                  QuantisationStep.AFTER,
                  !isQuantisationAfterEnabled
                )
              }
            />
            After equalizer
          </Label>
        </div>

        <NoiseBitSlider
          value={hearingAidNumNoiseBits}
          onChange={onNumNoiseBitsChange}
        />

        <DirectionalityWrapper>
          <H3>Directionality</H3>
          <DirectionalityContainer />
        </DirectionalityWrapper>
      </div>
    )
  }
}

export default connect(
  state => ({
    isEnabled: state.ha.isEnabled,
    grade: state.ha.grade,
    hearingLossGrade: state.hl.grade,
    isQuantisationBeforeEnabled: state.ha.isQuantisationBeforeEnabled,
    isQuantisationAfterEnabled: state.ha.isQuantisationAfterEnabled,
    hearingAidNumNoiseBits: state.ha.numNoiseBits,
  }),
  dispatch => ({
    onGradeChange: grade => dispatch(setHaGrade(grade)),
    onQuantisationChange: (step, isEnabled) =>
      dispatch(setQuantisationStepEnabled(step, isEnabled)),
    onNumNoiseBitsChange: numBits => dispatch(setHaNumNoiseBits(numBits)),
  })
)(HearingAidSimulatorContainer)
