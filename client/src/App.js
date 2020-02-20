import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import PrivateRoute from './privateRoute/PrivateRoutes'
import GlobalState from './context/GlobalState'

import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'

const App = () => {
  return (
    <div className='App'>
      <GlobalState>
        <h1>Github Login Training</h1>
        <Router>
          {/* <Link to='/'>Login</Link>
        <Link to='/Dashboard'>Dashboard</Link> */}
          <Login />
          <Switch>
            <Route path='/dashboard' component={Dashboard} />
          </Switch>
        </Router>
      </GlobalState>
    </div>
  )
}

export default App
