import React from 'react'
import { Redirect, Route } from 'react-router-dom'

// Stops anyone who is not authenticated and redericts them.
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest} render={props => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', pure: false }} />
    )}
  />
)

export default PrivateRoute
