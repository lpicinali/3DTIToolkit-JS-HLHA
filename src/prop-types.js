import PropTypes from 'prop-types'
import { values } from 'lodash'

import { HearingLossGrade } from './constants.js'

export const grade = PropTypes.oneOf(values(HearingLossGrade))
