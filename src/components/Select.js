import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import * as Icon from 'react-feather'
import styled, { css } from 'styled-components'

import { WHITE_SMOKE } from 'src/styles/colors.js'

import 'src/styles/react-select.scss'

const SelectWrapper = styled.div`
  display: flex;

  ${props =>
    props.hasScope &&
    css`
      border-radius: 4px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

      .Select-control {
        border-radius: 0 4px 4px 0;
        box-shadow: none;
      }
    `};
`

const SelectScope = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
  padding: 0 24px;
  background: ${WHITE_SMOKE};
  border-radius: 4px 0 0 4px;
  box-shadow: 1px 0 0 rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
`

const StretchedSelect = styled(ReactSelect)`
  width: 100%;
`

const IconAligner = styled.span`
  svg {
    vertical-align: middle;
  }
`

/**
 * Select
 */
class Select extends PureComponent {
  static propTypes = {
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    scope: PropTypes.string,
    simpleValue: PropTypes.bool,
  }

  static defaultProps = {
    clearable: false,
    searchable: false,
    scope: null,
    simpleValue: true,
  }

  render() {
    const { clearable, searchable, scope, simpleValue, ...props } = this.props

    return (
      <SelectWrapper hasScope={scope !== null}>
        {scope && <SelectScope>{scope}</SelectScope>}

        <StretchedSelect
          {...props}
          arrowRenderer={({ isOpen }) => (
            <IconAligner>
              {isOpen === true ? (
                <Icon.ChevronUp size={18} />
              ) : (
                <Icon.ChevronDown size={18} />
              )}
            </IconAligner>
          )}
          clearable={clearable}
          searchable={searchable}
          simpleValue={simpleValue}
        />
      </SelectWrapper>
    )
  }
}

export default Select
