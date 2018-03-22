import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import styled from 'styled-components'
import * as Icon from 'react-feather'

import { PlaybackState } from 'src/constants.js'
import { setPlaybackState } from 'src/actions/controls.actions.js'
import { TURQUOISE } from 'src/styles/colors.js'

const PlaybackControlButton = styled.button`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${TURQUOISE};
  }
`

const PlayIcon = styled(Icon.PlayCircle)`
  display: block;
`

const PauseIcon = styled(Icon.PauseCircle)`
  display: block;
`

const ButtonLabel = styled.span`
  display: block;
  flex-grow: 1;
  margin-left: 8px;
  font-size: 14px;
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

    return playbackState === PlaybackState.PLAYING ? (
      <PlaybackControlButton
        onClick={() => onStateChange(PlaybackState.PAUSED)}
      >
        <PauseIcon />
        <ButtonLabel>Playing</ButtonLabel>
      </PlaybackControlButton>
    ) : (
      <PlaybackControlButton
        onClick={() => onStateChange(PlaybackState.PLAYING)}
      >
        <PlayIcon />
        <ButtonLabel>Paused</ButtonLabel>
      </PlaybackControlButton>
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
