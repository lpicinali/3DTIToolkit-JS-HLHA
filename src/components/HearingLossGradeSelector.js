import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../prop-types.js'
import { HearingLossGrade } from '../constants.js'
import ButtonGroup from './ButtonGroup.js'

/**
 * Hearing Loss Grade Selector
 */
class HearingLossGradeSelector extends Component {
  static propTypes = {
    grade: CustomPropTypes.grade.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static gradeOptions = {
    NONE: 'None',
    MILD: 'Mild',
    MODERATE: 'Moderate',
    SEVERE: 'Severe',
  }

  render() {
    const { grade, onSelect } = this.props

    return (
      <ButtonGroup
        options={HearingLossGradeSelector.gradeOptions}
        value={grade}
        onSelect={onSelect}
      />
    )
  }
}

export default HearingLossGradeSelector
