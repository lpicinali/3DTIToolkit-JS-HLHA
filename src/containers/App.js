import React from 'react'
import { Provider } from 'react-redux'

import store from '../store.js'

export default function App() {
  return (
    <Provider store={store}>
      <h1>App</h1>
    </Provider>
  )
}
