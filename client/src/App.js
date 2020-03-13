import React, { useContext, useState, useEffect } from 'react'
import './App.css'

import Store from './context/store'
import queryString from 'query-string'

import 'react-notifications/lib/notifications.css'
import { NotificationContainer } from 'react-notifications'

import Home from './components/Home'
import Login from './components/Login.js'
import Header from './components/Header'

import Websocket from './components/Websocket'

const App = () => {
  const { initializeApp, authenticateToken, setErrorState, isAuth, user, setSocket, handleNotifications } = useContext(Store)
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
    if (token && !cookie) {
      setToken(token)
      authenticateToken(token)

      window.history.pushState({}, document.title, '/')

      try {
        initializeApp(token)
      } catch (error) {
        setErrorState(error)
      }
    } else if (cookie && !token) {
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
        ? (
          <>
            <Home />
            <Websocket user={user} handleNotifications={handleNotifications} setSocketGlobal={setSocket} />
            <NotificationContainer />
          </>
        )
        : <Login />}
    </div>
  )
}

export default App
