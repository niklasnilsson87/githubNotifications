import React, { useContext } from 'react'
import Store from '../context/store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'

import Notifications from './Notifications'
import Settings from './Settings'
import Repositories from './Repositories'

function Dashboard () {
  const context = useContext(Store)
  return (
    <div className='dashboard'>
      <Router>
        {context.error.isError && <div>Something went wrong ...</div>}
        {context.isLoading
          ? <p className='App-logo'>Loading</p>
          : (
            <div className='row'>
              <div className='col s2 grey darken-3'>
                <div className='container'>
                  <Navigation />
                </div>
              </div>
              <div className='col s10 blue min-height-90vh'>
                <div className='container'>
                  <div className='flex align-center justify-between'>
                    <label className='white-text' htmlFor='org-selector'>Select organization</label>
                    <select id='org-selector' className='browser-default'>
                      {context.orgData.map((d, i) => <option key={i}>{d.login}</option>)}
                    </select>

                  </div>
                  <div className='main-card card center-align'>
                    <Switch>
                      <Route exact path='/'>
                        <h2>Dashboard</h2>
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
