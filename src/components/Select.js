import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import * as Icon from 'react-feather'
import styled from 'styled-components'

import 'src/styles/react-select.scss'

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
    simpleValue: PropTypes.bool,
  }

  static defaultProps = {
    clearable: false,
    searchable: false,
    simpleValue: true,
  }

  render() {
    const { clearable, searchable, simpleValue } = this.props

    return (
      <ReactSelect
        {...this.props}
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
    )
  }
}

export default Select
