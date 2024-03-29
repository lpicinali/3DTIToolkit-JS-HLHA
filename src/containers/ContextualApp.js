import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'

import store from 'src/store/store.js'
import App from 'src/containers/App.js'

/**
 * Contextual App
 */
class ContextualApp extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

export default ContextualApp
