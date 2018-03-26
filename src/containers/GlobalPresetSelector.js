import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { keys, values } from 'lodash'

import { GlobalPreset } from 'src/constants.js'
import { setGlobalPreset } from 'src/actions/presets.actions.js'
import Select from 'src/components/Select.js'

const WideSelect = styled(Select)`
  min-width: 280px;
`

/**
 * Global Preset Selector
 */
class GlobalPresetSelector extends PureComponent {
  static propTypes = {
    preset: PropTypes.oneOf(values(GlobalPreset)).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { preset, onChange } = this.props

    return (
      <WideSelect
        scope="Preset"
        value={preset}
        placeholder="Choose a preset..."
        options={[
          {
            value: GlobalPreset.MILD_HEARING_LOSS,
            label: 'Mild hearing loss',
          },
          {
            value: GlobalPreset.MONOLATERAL_MILD_HEARING_LOSS,
            label: 'Monolateral mild hearing loss',
          },
          {
            value: GlobalPreset.MILD_HEARING_LOSS_WITH_HEARING_AID,
            label: 'Mild hearing loss with hearing aid',
          },
          {
            value: GlobalPreset.SEVERE_HEARING_LOSS_WITH_DISTORTION,
            label: 'Severe hearing loss with distortion',
          },
          {
            value:
              GlobalPreset.SEVERE_HEARING_LOSS_WITH_DISTORTION_AND_HEARING_AID,
            label: 'Severe hearing loss with distortion and hearing aid',
          },
        ]}
        onChange={onChange}
      />
    )
  }
}

export default connect(
  state => ({
    preset: state.presets.preset,
  }),
  dispatch => ({
    onChange: preset => dispatch(setGlobalPreset(preset)),
  })
)(GlobalPresetSelector)
