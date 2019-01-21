import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { setHrtf } from 'src/actions/hrtf.actions.js'
import hrtfFiles from 'src/audio/hrtf-files.js'
import Select from 'src/components/Select.js'

const WideSelect = styled(Select)`
  min-width: 200px;
`

const HrtfSelectorContainer = styled.div``

/**
 * Hrtf Selector
 */
class HrtfSelector extends PureComponent {
  static propTypes = {
    hrtfFilename: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hrtfFilename: null,
  }

  render() {
    const { hrtfFilename, onSelect } = this.props

    const options = hrtfFiles.map(hrtfFile => ({
      value: hrtfFile.filename,
      label: hrtfFile.label,
    }))

    return (
      <HrtfSelectorContainer>
        <WideSelect
          scope="HRTF"
          placeholder="Choose HRTF..."
          options={options}
          value={hrtfFilename}
          onChange={onSelect}
        />
      </HrtfSelectorContainer>
    )
  }
}

export default connect(
  state => ({
    hrtfFilename: state.hrtf.hrtfFilename,
  }),
  dispatch => ({
    onSelect: hrtfFilename => dispatch(setHrtf(hrtfFilename)),
  })
)(HrtfSelector)
