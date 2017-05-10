/* global window */
import { applyMiddleware, compose, createStore } from 'redux'

import rootReducer from './reducers/rootReducer'

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

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
  composeEnhancers(applyMiddleware(logger))
)
