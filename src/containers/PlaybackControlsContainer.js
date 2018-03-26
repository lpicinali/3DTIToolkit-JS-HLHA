import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import styled from 'styled-components'
import * as Icon from 'react-feather'

import { PlaybackState } from 'src/constants.js'
import { setPlaybackState } from 'src/actions/controls.actions.js'
import Button from 'src/components/Button.js'
import { TURQUOISE } from 'src/styles/colors.js'

const PlaybackControlButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 16px;
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
        <ButtonLabel>Pause</ButtonLabel>
      </PlaybackControlButton>
    ) : (
      <PlaybackControlButton
        onClick={() => onStateChange(PlaybackState.PLAYING)}
      >
        <PlayIcon />
        <ButtonLabel>Play</ButtonLabel>
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
