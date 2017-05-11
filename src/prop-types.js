import PropTypes from 'prop-types'
import { values } from 'lodash'

import { HearingLossGrade } from 'src/constants.js'

export const grade = PropTypes.oneOf(values(HearingLossGrade))

export const rect = PropTypes.shape({
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
})

export const position = PropTypes.shape({
  azimuth: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
})
