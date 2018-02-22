import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import { PlayButton, PauseButton } from 'react-player-controls'
import styled from 'styled-components'

import { PlaybackState } from 'src/constants.js'
import { setPlaybackState } from 'src/actions/controls.actions.js'
import { ModuleBox } from 'src/styles/elements.js'

const buttonStyles = `
  appearance: none;
  width: 20px !important;
  height: 20px !important;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }
`

const StyledPlayButton = styled(PlayButton)`
  ${buttonStyles};
`
const StyledPauseButton = styled(PauseButton)`
  ${buttonStyles};
`

/**
 * Playback Controls Container
 */
class PlaybackControlsContainer extends Component {
  static propTypes = {
    playbackState: PropTypes.oneOf(values(PlaybackState)).isRequired,
    onStateChange: PropTypes.func.isRequired,
  }

  render() {
    const { playbackState, onStateChange } = this.props

    return (
      <ModuleBox>
        {playbackState === PlaybackState.PAUSED ? (
          <StyledPlayButton
            isEnabled
            onClick={() => onStateChange(PlaybackState.PLAYING)}
            style={{ width: 40, height: 40 }}
          />
        ) : (
          <StyledPauseButton
            isEnabled
            onClick={() => onStateChange(PlaybackState.PAUSED)}
            style={{ width: 40, height: 40 }}
          />
        )}
      </ModuleBox>
    )
  }
}

export default connect(
  state => ({
    playbackState: state.controls.playbackState,
  }),
  dispatch => ({
    onStateChange: state => dispatch(setPlaybackState(state)),
  })
)(PlaybackControlsContainer)
