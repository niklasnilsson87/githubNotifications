import React, { useContext, useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Store from './context/store'
import queryString from 'query-string'

import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Header from './components/Header'

const App = () => {
  const context = useContext(Store)
  const [token, setToken] = useState('')

  useEffect(() => {
    const token = queryString.parse(window.location.search).access_token
    if (token) {
      setToken(token)
      context.authenticateToken(token)

      window.history.pushState({}, document.title, '/')

      try {
        context.fetchUser(token)
      } catch (error) {
        context.setErrorState(error)
      }
    }
  }, [token])

  return (
    <div className='App'>
      <Header />
      {context.isAuth
        ? <Dashboard />
        : <Login />}

    </div>
  )
}

export default App
