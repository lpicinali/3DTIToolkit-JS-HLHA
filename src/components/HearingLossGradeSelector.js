import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { values } from 'lodash'

import * as CustomPropTypes from 'src/prop-types.js'
import { HearingLossGrade } from 'src/constants.js'
import ButtonGroup from 'src/components/ButtonGroup.js'

/**
 * Hearing Loss Grade Selector
 */
class HearingLossGradeSelector extends Component {
  static propTypes = {
    grade: CustomPropTypes.grade.isRequired,
    enabledGrades: PropTypes.arrayOf(CustomPropTypes.grade),
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    enabledGrades: values(HearingLossGrade),
  }

  static gradeOptions = {
    NONE: 'None',
    MILD: 'Mild',
    MODERATE: 'Moderate',
    SEVERE: 'Severe',
  }

  render() {
    const { grade, enabledGrades, onSelect } = this.props

    return (
      <ButtonGroup
        options={HearingLossGradeSelector.gradeOptions}
        enabledOptions={enabledGrades}
        value={grade}
        onSelect={onSelect}
      />
    )
  }
}

export default HearingLossGradeSelector
