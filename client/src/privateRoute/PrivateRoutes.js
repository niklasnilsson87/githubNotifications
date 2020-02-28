import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import Store from '../context/store'

// Stops anyone who is not authenticated and redericts them.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = !!window.localStorage.getItem('user')
  console.log(user)

  return (
    <Route
      {...rest} render={props => (
        user
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', pure: false }} />)}
    />
  )
}

export default PrivateRoute
