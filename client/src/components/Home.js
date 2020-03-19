import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Store from '../context/store'
import logo from '../img/giphy.gif'

import Navigation from './partials/Navigation'
import Notifications from './Notifications'
import Settings from './Settings'
import Repositories from './repository/Repositories'
import Dashboard from './dashboard/Dashboard'

const Home = () => {
  const {
    orgData,
    user,
    getRepos,
    isLoading,
    activeOrg,
    setActiveOrganization,
    error: { isError }
  } = useContext(Store)

  const [selectedOrg, setSelectedOrg] = useState('')
  const [isRepo, setIsRepo] = useState(true)

  useEffect(() => {
    if (orgData.length) {
      setSelectedOrg(orgData[0].login)
      setActiveOrganization(orgData[0].login)
      getRepos(orgData[0].login)
    }
  }, [orgData])

  function handleChange (e) {
    const { value } = e.target
    setSelectedOrg(value)
    setActiveOrganization(value)
    const org = orgData.find(org => org.login === value)
    if (org.repo) {
      setIsRepo(true)
    } else {
      setIsRepo(false)
    }
    getRepos(value)
  }

  return (
    <div className='dashboard'>
      <Router>
        {isError && <div>Something went wrong ...</div>}
        {isLoading ? (
          <div className='center-align margin-top50'>
            <img src={logo} alt='Loading' />
          </div>
        ) : (
          <div className='flex flex-wrap row margin-bottom-0'>
            <div className='col s2 grey darken-3 dashboard-sidebar'>
              <div className='user-container'>
                <p className='white-text mb-2'>
                  Welcome {user.name}
                </p>
                <img
                  className='user-img circle'
                  alt={user.name}
                  src={user.avatar_url}
                />
                <p className='white-text'>Active: {activeOrg}</p>
              </div>
              <div className='container'>
                <Navigation />
              </div>
            </div>
            <div className='col s10 blue lighten-1 main-layout'>
              <div className='container'>
                <div className='flex align-center margin-top50 justify-between'>
                  <label className='white-text' htmlFor='org-selector'>
                    Select organization
                  </label>
                  <select
                    id='org-selector'
                    value={selectedOrg}
                    onChange={handleChange}
                    className='browser-default'
                  >
                    {orgData.length
                      ? orgData.map((d, i) => (
                        <option key={i} value={d.login}>
                          {d.login}
                        </option>
                      ))
                      : ''}
                  </select>
                </div>
                <div className='main-card card'>
                  <Switch>
                    <Route exact path='/'>
                      <Dashboard isUser={isRepo} />
                    </Route>
                    <Route path='/notifications'>
                      <Notifications />
                    </Route>
                    <Route path='/repositories'>
                      <Repositories />
                    </Route>
                    <Route path='/settings'>
                      <Settings />
                    </Route>
                  </Switch>
                  <div className='card-content grey lighten-4' />
                </div>
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  )
}

export default Home
