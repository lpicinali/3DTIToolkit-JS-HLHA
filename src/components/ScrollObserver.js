/* global window */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from 'src/prop-types.js'

/**
 * Scroll Observer
 */
class ScrollObserver extends Component {
  static propTypes = {
    target: CustomPropTypes.scrollable.isRequired,
    children: PropTypes.any,
  }

  state = {
    top: 0,
    left: 0,
  }

  componentDidMount() {
    const { target } = this.props

    target.addEventListener('scroll', () => {
      this.setState(() => ({
        top: target.scrollTop || target.scrollY,
        left: target.scrollLeft || target.scrollX,
      }))
    })
  }

  render() {
    const { children } = this.props
    const { top, left } = this.state

    return React.cloneElement(children, { top, left })
  }
}

export default ScrollObserver
