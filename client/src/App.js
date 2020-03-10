import React, { useContext, useState, useEffect } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

import Store from './context/store'
import queryString from 'query-string'

import Dashboard from './components/Dashboard.js'
import Login from './components/Login.js'
import Header from './components/Header'

const App = () => {
  const { initializeApp, authenticateToken, setErrorState, isAuth } = useContext(Store)
  const [token, setToken] = useState('')

  const getCookie = () => {
    const cookie = {}
    document.cookie.split(';').forEach((el) => {
      const [k, v] = el.split('=')
      cookie[k.trim()] = v
    })
    return cookie.token
  }

  useEffect(() => {
    const token = queryString.parse(window.location.search).access_token
    const cookie = getCookie()
    console.log(cookie, token)
    if (token && !cookie) {
      console.log('token no cookie')
      setToken(token)
      authenticateToken(token)

      window.history.pushState({}, document.title, '/')

      try {
        initializeApp(token)
      } catch (error) {
        setErrorState(error)
      }
    } else if (cookie && !token) {
      console.log('cookie no token')
      setToken(cookie)
      try {
        authenticateToken(cookie)
        initializeApp(cookie)
      } catch (error) {
        setErrorState(error)
      }
    }
  }, [])

  return (
    <div className='App'>
      <Header />
      {isAuth
        ? <Dashboard />
        : <Login />}
    </div>
  )
}

export default App
