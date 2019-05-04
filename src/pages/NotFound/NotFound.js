import React from 'react'
import { Helmet } from 'react-helmet-async'

const NotFound = ({ staticContext = {} }) => {
  staticContext.notFound = true
  return (
    <div>
      <Helmet>
        <title>TallahasseeCreative.com | Not Found! </title>
      </Helmet>
      Not Found!
    </div>
  )
}

export default NotFound
