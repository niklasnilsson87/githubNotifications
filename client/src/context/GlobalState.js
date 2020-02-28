import React, { useState } from 'react'
import Store from './store'

const GlobalState = props => {
  const [user, setUser] = useState({})
  const [orgData, setOrgData] = useState([])
  const [accessToken, setToken] = useState()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})
  const [userSettings, setUserSettings] = useState({})

  const saveUser = async (user) => {
    const data = {
      id: user.id,
      name: user.name,
      slackUrl: 'empty'
    }

    const config = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await window.fetch('https://github-server.niklasdeveloper.nu/user', config)
    const result = await response.json()
    setUserSettings(result)
  }

  const authenticateToken = token => {
    setToken(token)
    setIsAuth(true)
  }

  const logout = () => {
    setUser({})
    setOrgData([])
    setToken(null)
    setIsAuth(false)
  }

  const fetchUser = async (token) => {
    const url = 'https://api.github.com/user'
    setIsLoading(true)
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token
      }
    })
    const result = await response.json()
    setUser(result)
    // window.localStorage.setItem('user', result.name)
    fetchOrg(token)
    saveUser(result)
    setIsLoading(false)
  }

  const fetchOrg = async (token) => {
    const url = 'https://api.github.com/user/orgs'
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token,
        'user-agent': user.name
      }
    })
    const result = await response.json()
    setOrgData(result)
  }

  const setErrorState = (e) => {
    setError({
      isError: true,
      message: e
    })
  }

  return <Store.Provider value={{ user, error, userSettings, authenticateToken, setErrorState, fetchUser, fetchOrg, logout, orgData, isAuth }}>{props.children}</Store.Provider>
}

export default GlobalState
