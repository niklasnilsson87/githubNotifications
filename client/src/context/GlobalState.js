import React, { useState } from 'react'
import Store from './store'

const GlobalState = props => {
  const [user, setUser] = useState({ hits: [] })
  const [orgData, setOrgData] = useState([])
  const [accessToken, setToken] = useState()
  const [isAuth, setIsAuth] = useState(false)

  const authenticate = token => {
    // console.log(token)
    setToken(token)
    setIsAuth(true)
  }

  const fetchUser = async (token, loading) => {
    const url = 'https://api.github.com/user'
    loading(true)
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token
      }
    })
    const result = await response.json()
    console.log('user', result)
    setUser(result)
    loading(false)
  }

  const fetchOrg = async (token, loading) => {
    const url = 'https://api.github.com/user/orgs'
    loading(true)
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token,
        'user-agent': user.name
      }
    })
    const result = await response.json()
    console.log('orgs', result)
    setOrgData(result)
    loading(false)
  }

  return <Store.Provider value={{ user, authenticate, fetchUser, fetchOrg, orgData, isAuth }}>{props.children}</Store.Provider>
}

export default GlobalState
