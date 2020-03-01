import React, { useContext, useEffect, useState } from 'react'
import Store from '../context/store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'
// import Pagination from './Pagination'

import Notifications from './Notifications'
import Settings from './Settings'
import Repositories from './Repositories'

function Dashboard () {
  const context = useContext(Store)
  const [selectedOrg, setSelectedOrg] = useState('')
  const [activeOrg, setActiveOrg] = useState('')
  console.log(context)

  // useEffect(() => {
  //   if (context.orgData.length !== 0) {
  //     console.log(context.orgData[0].login)
  //   }
  // }, [context.orgData])

  function handleChange (event) {
    setSelectedOrg(event.target.value)
    setActiveOrg(`Active org: ${event.target.value}`)
    context.getRepos(event.target.value)
  }

  return (
    <div className='dashboard'>
      <Router>
        {context.error.isError && <div>Something went wrong ...</div>}
        {context.isLoading
          ? <p className='App-logo'>Loading</p>
          : (
            <div className='row'>
              <div className='col s2 grey darken-3 min-height-90vh'>
                <div className='user-container'>
                  <p className='font-size20-text-white mb-2'>Welcome {context.user.name}</p>
                  <img className='user-img circle' alt={context.user.name} src={context.user.avatar_url} />
                  <p className='white-text'>{activeOrg}</p>
                </div>
                <div className='container'>
                  <Navigation />
                </div>
              </div>
              <div className='col s10 blue min-height-90vh'>
                <div className='container'>
                  <div className='flex align-center margin-top50 justify-between'>
                    <label className='white-text' htmlFor='org-selector'>Select organization</label>
                    <select id='org-selector' value={selectedOrg} onChange={handleChange} className='browser-default'>
                      <option value='' disabled>--Please choose an option--</option>
                      {context.orgData.map((d, i) => <option key={i} value={d.login}>{d.login}</option>)}
                    </select>

                  </div>
                  <div className='main-card card'>
                    <Switch>
                      <Route exact path='/'>
                        <h2 className='center-align'>Dashboard</h2>
                        <ul>
                          {context.orgData.map((o, i) =>
                            <li key={i}>
                              <div className='link-container'>
                                <img className='org-img' src={o.avatar_url} alt={o.login} />
                                <a className='org-link' target='_blank' rel='noopener noreferrer' href={`https://github.com/${o.login}`}>{o.login}</a>
                              </div>
                            </li>)}
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
