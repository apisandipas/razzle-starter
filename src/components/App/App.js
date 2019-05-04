import React, { Fragment } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import './App.scss'

import routes from 'routes'

const App = () => {
  return (
    <Fragment>
      <header>Header</header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
      <footer>Footer</footer>
    </Fragment>
  )
}

export default App
