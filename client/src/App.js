import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'

import Home from './components/Home.js'
import Login from './components/Login.js'

function App () {
  return (
    <div className='App'>
      <h1>Github Login Training</h1>
      <Router>
        <Link to='/'>Login</Link>
        <Link to='/home'>Home</Link>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
        </Switch>
      </Router>

    </div>
  )
}

export default App
