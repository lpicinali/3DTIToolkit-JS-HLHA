/* global window */
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers/rootReducer'
import rootSaga from './sagas/rootSaga'

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

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
