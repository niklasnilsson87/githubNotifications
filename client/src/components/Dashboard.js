import React, { useContext, useEffect, useState } from 'react'
import Store from '../context/store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'
// import Pagination from './Pagination'
import logo from '../img/giphy.gif'

import Notifications from './Notifications'
import Settings from './Settings'
import Repositories from './Repositories'

function Dashboard () {
  const { orgData, user, getRepos, isLoading, activeOrg, setActiveOrganization, error: { isError } } = useContext(Store)
  const [selectedOrg, setSelectedOrg] = useState('')

  useEffect(() => {
    if (orgData.length) {
      setSelectedOrg(orgData[0].login)
      setActiveOrganization(orgData[0].login)
      getRepos(orgData[0].login)
    }
  }, [orgData])

  // useEffect(() => {
  //   if (user) {

  // }, [user])

  function handleChange (event) {
    setSelectedOrg(event.target.value)
    setActiveOrganization(event.target.value)
    getRepos(event.target.value)
  }

  return (
    <div className='dashboard'>
      <Router>
        {isError && <div>Something went wrong ...</div>}
        {isLoading
          ? <div className='center-align'> <img src={logo} alt='Loading' /> </div>
          : (
            <div className='flex flex-wrap row margin-bottom-0'>
              <div className='col s2 grey darken-3 dashboard-sidebar'>
                <div className='user-container'>
                  <p className='font-size20-text-white mb-2'>Welcome {user.name}</p>
                  <img className='user-img circle' alt={user.name} src={user.avatar_url} />
                  <p className='white-text'>Active: {activeOrg}</p>
                </div>
                <div className='container'>
                  <Navigation />
                </div>
              </div>
              <div className='col s10 blue main-layout'>
                <div className='container'>
                  <div className='flex align-center margin-top50 justify-between'>
                    <label className='white-text' htmlFor='org-selector'>Select organization</label>
                    <select id='org-selector' value={selectedOrg} onChange={handleChange} className='browser-default'>
                      {orgData.length
                        ? orgData.map((d, i) => <option key={i} value={d.login}>{d.login}</option>) : ''}
                    </select>
                  </div>
                  <div className='main-card card'>
                    <Switch>
                      <Route exact path='/'>
                        <h2 className='center-align'>Dashboard</h2>
                        <ul>
                          {orgData.length
                            ? orgData.map((o, i) =>
                              <li key={i}>
                                <div className='link-container'>
                                  <img className='org-img' src={o.avatar_url} alt={o.login} />
                                  <a className='org-link' target='_blank' rel='noopener noreferrer' href={`https://github.com/${o.login}`}>{o.login}</a>
                                </div>
                              </li>) : ''}
                        </ul>
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

export default Dashboard
