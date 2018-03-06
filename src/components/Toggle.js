import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'
import { values } from 'lodash'

import { BLACK, DARK_GRAY, GRAY, TURQUOISE } from 'src/styles/colors.js'

export const LabelPosition = {
  BEFORE: 'BEFORE',
  AFTER: 'AFTER',
}

const ToggleTrack = styled.div`
  width: 28px;
  height: 16px;
  border-radius: 16px;
  background: ${GRAY};
`

const ToggleHandle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${props => (props.isChecked ? TURQUOISE : DARK_GRAY)};
  transform: translateX(${props => (props.isChecked ? 12 : 0)}px);
  transition: all 0.1s;
`

const ToggleLabel = styled.div`
  margin: 0 8px;
  color: ${DARK_GRAY};
  font-size: 14px;
`

const ToggleWrap = styled.div`
  display: flex;
  margin-bottom: 8px;
  line-height: 16px;
  cursor: pointer;

  &:hover ${ToggleHandle} {
    background-color: ${props =>
      props.isChecked ? lighten(0.05, TURQUOISE) : BLACK};
  }
`

/**
 * Toggle
 */
export class Toggle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isChecked: PropTypes.bool.isRequired,
    label: PropTypes.node,
    labelPosition: PropTypes.oneOf(values(LabelPosition)),
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: '',
    label: null,
    labelPosition: LabelPosition.AFTER,
  }

  render() {
    const { className, isChecked, label, labelPosition, onChange } = this.props

    return (
      <ToggleWrap
        className={className}
        isChecked={isChecked}
        onClick={() => onChange(!isChecked)}
      >
        {labelPosition === LabelPosition.BEFORE && (
          <ToggleLabel>{label}</ToggleLabel>
        )}

        <ToggleTrack>
          <ToggleHandle isChecked={isChecked} />
        </ToggleTrack>

        {labelPosition === LabelPosition.AFTER && (
          <ToggleLabel>{label}</ToggleLabel>
        )}
      </ToggleWrap>
    )
  }
}

export default Toggle
