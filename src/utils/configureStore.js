import { createStore, compose, applyMiddleware } from 'redux'
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import axios from 'axios'
import reducers from 'reducers'

const api = axios.create({
  baseURL: process.env.API_URL
})

const configureStoreDev = () => {
  const middlewares = [
    reduxImmutableStateInvariant(),
    thunk.withExtraArgument({ api })
  ]

  const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

const configureStoreProd = () => {
  const middlewares = [thunk.withExtraArgument({ api })]

  const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(...middlewares))
  )
  return store
}

const configureStore =
  process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev

export default configureStore
