import express from 'express'
import { matchRoutes } from 'react-router-config'
import renderer from 'utils/renderer'
import configureStore from 'utils/configureStore'
import routes from 'routes'

const server = express()

server.disable('x-powered-by')
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR))

server.get('/*', (req, res) => {
  const store = configureStore()

  // Map over our routes, select our matching route and then call its loadData function, if it has one
  const promises = matchRoutes(routes, req.path).map(({ route }) => {
    return route.component.loadData
      ? route.component.loadData(store, req)
      : Promise.resolve(null)
  })

  // When our loadData fn resolves, set up the renderer helper and return our populated template
  Promise.all(promises)
    .then(() => {
      const context = {}
      const content = renderer(req, store, context)

      if (context.url) {
        return res.redirect(context.url)
      }

      res.status(context.statusCode || 200).send(content)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error.message, stack: error.stack })
    })
})

export default server
