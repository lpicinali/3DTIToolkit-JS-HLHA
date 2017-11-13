import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduce } from 'lodash'

import {
  setHeadRadius,
  setPerformanceModeEnabled,
  setTargetVolume,
} from 'src/actions/controls.actions.js'
import { setTarget } from 'src/actions/target.actions.js'
import DirectionalityContainer from 'src/containers/DirectionalityContainer.js'
import ButtonGroup from 'src/components/ButtonGroup.js'
import Slider from 'src/components/Slider.js'
import VolumeSlider from 'src/components/VolumeSlider.js'
import { H2, H3 } from 'src/styles/elements.js'

/**
 * Target Selector Container
 */
class TargetSelectorContainer extends Component {
  static propTypes = {
    targets: PropTypes.object.isRequired,
    target: PropTypes.string,
    volume: PropTypes.number.isRequired,
    isPerformanceModeEnabled: PropTypes.bool.isRequired,
    headRadius: PropTypes.number.isRequired,
    onSelect: PropTypes.func.isRequired,
    onChangeVolume: PropTypes.func.isRequired,
    onChangePerformanceMode: PropTypes.func.isRequired,
    onChangeHeadRadius: PropTypes.func.isRequired,
  }

  static defaultProps = {
    target: null,
  }

  render() {
    const {
      targets,
      target,
      volume,
      isPerformanceModeEnabled,
      headRadius,
      onSelect,
      onChangeVolume,
      onChangePerformanceMode,
      onChangeHeadRadius,
    } = this.props

    const options = reduce(
      targets,
      (aggr, file) => ({
        ...aggr,
        [file.filename]: file.title,
      }),
      {}
    )

    return (
      <div>
        <H2>Target</H2>

        <H3>Source</H3>
        <ButtonGroup
          options={options}
          enabledOptions={Object.keys(options)}
          value={target}
          isVertical
          onSelect={onSelect}
        />

        <div style={{ display: 'flex' }}>
          <div style={{ paddingRight: 16 }}>
            <H3>Volume</H3>
            <VolumeSlider volume={volume} onChange={onChangeVolume} />
          </div>

          <div>
            <H3>Performance mode</H3>
            <input
              type="checkbox"
              checked={isPerformanceModeEnabled}
              onClick={() => onChangePerformanceMode(!isPerformanceModeEnabled)}
            />
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{ paddingRight: 16 }}>
            <H3>Head radius: {String(headRadius).padEnd(6, '0')} m</H3>
            <Slider
              value={headRadius}
              min={0.01}
              max={0.5}
              step={0.0005}
              onChange={onChangeHeadRadius}
            />
          </div>

          <div>
            <H3>Directionality</H3>
            <DirectionalityContainer />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    targets: state.target.targets,
    target: state.target.selected,
    volume: state.controls.targetVolume,
    isPerformanceModeEnabled: state.controls.isPerformanceModeEnabled,
    headRadius: state.controls.headRadius,
  }),
  dispatch => ({
    onSelect: target => dispatch(setTarget(target)),
    onChangeVolume: volume => dispatch(setTargetVolume(volume)),
    onChangePerformanceMode: isEnabled =>
      dispatch(setPerformanceModeEnabled(isEnabled)),
    onChangeHeadRadius: radius => dispatch(setHeadRadius(radius)),
  })
)(TargetSelectorContainer)
