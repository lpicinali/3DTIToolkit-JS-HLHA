import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../prop-types.js'
import { HearingLossGrade } from '../constants.js'
import Button from './Button.js'

/**
 * Hearing Loss Grade Selector
 */
class HearingLossGradeSelector extends Component {
  static propTypes = {
    grade: CustomPropTypes.grade.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render() {
    const { grade, onSelect } = this.props

    return (
      <div>
        <Button
          isActive={grade === HearingLossGrade.NONE}
          onClick={() => onSelect(HearingLossGrade.NONE)}
        >
          None
        </Button>
        <Button
          isActive={grade === HearingLossGrade.MILD}
          onClick={() => onSelect(HearingLossGrade.MILD)}
        >
          Mild
        </Button>
        <Button
          isActive={grade === HearingLossGrade.MODERATE}
          onClick={() => onSelect(HearingLossGrade.MODERATE)}
        >
          Moderate
        </Button>
        <Button
          isActive={grade === HearingLossGrade.SEVERE}
          onClick={() => onSelect(HearingLossGrade.SEVERE)}
        >
          Severe
        </Button>
      </div>
    )
  }
}

export default HearingLossGradeSelector
