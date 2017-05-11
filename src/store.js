/* global window */
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/rootReducer'

const logger = store => next => action => {
  if (window.reduxLogger === true) {
    console.log('Dispatching action:', action)
    const result = next(action)
    console.log('State after action:', store.getState())
    return result
  } else {
    return next(action)
  }
}

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger))
)
