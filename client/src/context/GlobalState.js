import React, { useState, useEffect, useRef } from 'react'
import Store from './store'
import { NotificationManager } from 'react-notifications'

const GlobalState = props => {
  const [user, setUser] = useState({})
  const [orgData, setOrgData] = useState([])
  const [activeOrg, setActiveOrg] = useState('')
  const [reposData, setReposData] = useState([])
  const [accessToken, setToken] = useState()
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({})
  const [socket, setSocket] = useState(null)
  const [userSettings, setUserSettings] = useState({})
  const [notifications, setNotifications] = useState([])
  const ref = useRef(notifications)

  useEffect(() => {
    if (userSettings && notifications.length === 0) {
      if (userSettings.events) {
        setNotifications(userSettings.events)
      }
    }
  }, [userSettings])

  useEffect(() => {
    ref.current = notifications
  }, [notifications])

  const saveUser = async user => {
    const data = {
      id: user.id,
      name: user.name
    }

    const config = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const response = await window.fetch(
      'https://github-server.niklasdeveloper.nu/user',
      config
    )
    const result = await response.json()
    setUserSettings(result)
  }

  const saveUrl = async slackUrl => {
    const data = {
      id: user.id,
      name: user.name,
      slackUrl: slackUrl
    }

    const config = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    const url = 'https://github-server.niklasdeveloper.nu/saveUrl'
    const response = await window.fetch(url, config)
    const result = await response.json()
    setUserSettings(result)
    NotificationManager.success('Saved url')
  }

  const authenticateToken = token => {
    setToken(token)
    setIsAuth(true)
  }

  const setActiveOrganization = org => setActiveOrg(org)

  const logout = () => {
    document.cookie = 'token=; Max-Age=0'
    socket.close()
    setUser({})
    setOrgData([])
    setReposData([])
    setUserSettings({})
    setError({})
    setActiveOrg('')
    setSocket(null)
    setToken(null)
    setIsAuth(false)
  }

  const initializeApp = async token => {
    const url = 'https://api.github.com/user'
    setIsLoading(true)
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + token
      }
    })
    const result = await response.json()
    result.repo = true
    setUser(result)
    await Promise.all([fetchOrg(token, result), saveUser(result)])
    setCookie(token)
    setIsLoading(false)
  }

  function handleNotifications (not) {
    NotificationManager.info(`${not.sender} made an ${not.event} on repo ${not.repoName}`, 'Notification')
    setNotifications([...ref.current, not])
  }

  const setCookie = token => {
    const date = new Date()
    date.setTime(date.getTime() + 1 * 60 * 60 * 1000)
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

    result.unshift(user)
    setOrgData(result)
  }

  const fetchEvents = async () => {
    const url = `https://api.github.com/orgs/${activeOrg}/events?page=1&per_page=100`
    const response = await window.fetch(url, {
      headers: {
        Authorization: 'token ' + accessToken
      }
    })
    const result = await response.json()
    return result
  }

  const getRepos = async repo => {
    let url = ''
    if (repo === user.login) {
      url = 'https://api.github.com/user/repos'
    } else {
      url = `https://api.github.com/orgs/${repo}/repos?page=1&per_page=100`
    }

    const response = await window.fetch(url,
      { headers: { Authorization: 'token ' + accessToken } })
    const result = await response.json()
    setReposData(result)
  }

  const setErrorState = e => {
    setError({
      isError: true,
      message: e
    })
  }

  const sendHook = (hooksToSet, repo) => {
    console.log(repo)
    const hook = {
      url: repo.hooks_url,
      accessToken: accessToken
    }

    console.log('sending hooks to registerWebhook')

    const webhookUrl = 'https://github-server.niklasdeveloper.nu/registerWebhook'
    window.fetch(webhookUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(hook)
    }).then(res => res.json()
      .then(result => {
        return result
      })
    ).catch(error => console.log(error))

    // const config = {
    //   name: 'web',
    //   active: true,
    //   events: ['push', 'issues', 'release'],
    //   config: {
    //     url: 'https://github-server.niklasdeveloper.nu/webhook',
    //     content_type: 'json',
    //     insecure_ssl: 0
    //   }
    // }

    // window.fetch(repo.hooks_url, {
    //   method: 'POST',
    //   headers: { Authorization: 'token ' + accessToken },
    //   body: JSON.stringify(config)
    // }).then(res =>
    //   res.json()
    //     .then(result => {
    //       return result
    //     })
    // ).catch(error => console.log(error))

    console.log('updating state')

    const updateSettings = {
      id: user.id,
      name: user.name,
      repo: {
        id: repo.id,
        actions: hooksToSet
      }
    }

    const url = 'https://github-server.niklasdeveloper.nu/update'
    window.fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateSettings)
    })
      .then(res => res.json()
        .then(result => {
          console.log(result)
          NotificationManager.success('Settings saved')
        })
      ).catch(error => console.log(error))
  }

  const deleteNotifications = async () => {
    if (userSettings.events.length) {
      const url = `https://github-server.niklasdeveloper.nu/deleteNotifications?id=${user.id}&name=${user.name}`
      const request = await window.fetch(url, {
        method: 'DELETE'
      })
      const response = await request.json()
      setUserSettings(response.obj)
    }
    setNotifications([])
  }

  return (
    <Store.Provider
      value={{
        user,
        error,
        setSocket,
        notifications,
        handleNotifications,
        deleteNotifications,
        saveUrl,
        fetchEvents,
        sendHook,
        activeOrg,
        setActiveOrganization,
        userSettings,
        authenticateToken,
        setErrorState,
        initializeApp,
        getRepos,
        fetchOrg,
        logout,
        orgData,
        reposData,
        isAuth,
        saveUser,
        isLoading
      }}
    >
      {props.children}
    </Store.Provider>
  )
}

export default GlobalState
