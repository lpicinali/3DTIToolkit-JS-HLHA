import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { values } from 'lodash'
import { PlayButton, PauseButton } from 'react-player-controls'

import { PlaybackState } from 'src/constants.js'
import { setPlaybackState } from 'src/actions/controls.actions.js'

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
      <div className="PlaybackControlsContainer">
        {playbackState === PlaybackState.PAUSED
          ? <PlayButton
              isEnabled
              onClick={() => onStateChange(PlaybackState.PLAYING)}
              style={{ width: 40, height: 40 }}
            />
          : <PauseButton
              isEnabled
              onClick={() => onStateChange(PlaybackState.PAUSED)}
              style={{ width: 40, height: 40 }}
            />}
      </div>
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