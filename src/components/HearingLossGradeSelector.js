import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { map, values } from 'lodash'

import * as CustomPropTypes from 'src/prop-types.js'
import { HearingLossGrade } from 'src/constants.js'
import Select from 'src/components/Select.js'

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

  static GRADE_OPTIONS = {
    [HearingLossGrade.NONE]: 'None',
    [HearingLossGrade.MILD]: 'Mild',
    [HearingLossGrade.MODERATE]: 'Moderate',
    [HearingLossGrade.SEVERE]: 'Severe',
  }

  render() {
    const { grade, enabledGrades, onSelect } = this.props

    const options = map(
      HearingLossGradeSelector.GRADE_OPTIONS,
      (label, value) => ({
        label,
        value,
        disabled: enabledGrades.includes(value) === false,
      })
    )

    return <Select onChange={onSelect} options={options} value={grade} />
  }
}

export default HearingLossGradeSelector
