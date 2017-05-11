import PropTypes from 'prop-types'
import { values } from 'lodash'

import { HearingLossGrade } from 'src/constants.js'

export const grade = PropTypes.oneOf(values(HearingLossGrade))
