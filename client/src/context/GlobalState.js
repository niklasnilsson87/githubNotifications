import React, { useState } from 'react'
import Store from './store'

const GlobalState = props => {
  const [user, setUser] = useState({})
  const [orgData, setOrgData] = useState([])
  const [activeOrg, setActiveOrg] = useState('')
  const [reposData, setReposData] = useState([])
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

  const setActiveOrganization = org => setActiveOrg(org)

  const logout = () => {
    setUser({})
    setOrgData([])
    setToken(null)
    setIsAuth(false)
  }

  const initializeApp = async (token) => {
    const url = 'https://api.github.com/user'
    setIsLoading(true)
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token
      }
    })
    const result = await response.json()

    setUser(result)
    await Promise.all([
      fetchOrg(token, result),
      saveUser(result)
    ])
    console.log('DONE')
    setIsLoading(false)

    const date = new Date()
    date.setTime(date.getTime() + (1 * 60 * 60 * 1000))

    document.cookie = 'token=' + token + '; expires=' + date.toUTCString()
  }

  const fetchOrg = async (token, user) => {
    const url = 'https://api.github.com/user/orgs'
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token
      }
    })
    const result = await response.json()

    result.push(user)
    setOrgData(result)
  }

  const getRepos = async (repo) => {
    let url = ''
    if (repo === user.login) {
      url = 'https://api.github.com/user/repos'
    } else {
      url = `https://api.github.com/orgs/${repo}/repos?page=1&per_page=1000000000`
    }

    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + accessToken
      }
    })
    const result = await response.json()
    setReposData(result)
  }

  const setErrorState = (e) => {
    setError({
      isError: true,
      message: e
    })
  }

  const sendHook = hooksToSet => {
    console.log(activeOrg)
    console.log(hooksToSet)
  }

  return <Store.Provider value={{ user, error, sendHook, activeOrg, setActiveOrganization, userSettings, authenticateToken, setErrorState, initializeApp, getRepos, fetchOrg, logout, orgData, reposData, isAuth, isLoading }}>{props.children}</Store.Provider>
}

export default GlobalState
