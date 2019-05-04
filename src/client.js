import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { hydrate } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import { composeWithDevTools } from 'redux-devtools-extension'
import { loadableReady } from '@loadable/component'

import reducers from 'reducers'
import App from 'components/App/App'

const api = axios.create({
  baseURL: process.env.API_URL //||'http://localhost:3001'
})

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ api, req: false }))
  )
)

loadableReady(() => {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>,
    document.getElementById('root')
  )
})

if (module.hot) {
  module.hot.accept()
}
