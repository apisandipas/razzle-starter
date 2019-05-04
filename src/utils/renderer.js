import React from 'react'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux'
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server'
import serialize from 'serialize-javascript'
import App from 'components/App/App'

const renderer = (req, store, context) => {
  const helmetContext = {}
  // Create the server side style sheet
  const sheet = new ServerStyleSheet()

  const extractor = new ChunkExtractor({
    statsFile: path.resolve('build/loadable-stats.json'),
    entrypoints: ['client']
  })

  // When the app is rendered collect the styles that are used inside it
  const markup = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <ChunkExtractorManager extractor={extractor}>
          <StaticRouter context={context} location={req.url}>
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
          </StaticRouter>
        </ChunkExtractorManager>
      </Provider>
    )
  )

  // Generate all the style tags so they can be rendered into the page
  const styleTags = sheet.getStyleTags()

  // Receive the tags through the helmetContext
  const { helmet } = helmetContext

  return `
    <!doctype html>
      <html lang="en">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>TallahasseeCreative.com</title>
        ${helmet.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.meta.toString()}
        ${extractor.getLinkTags()}
        ${extractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${markup}</div>
        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        ${styleTags}
        ${extractor.getScriptTags()}
      </body>
    </html>`
}

export default renderer
