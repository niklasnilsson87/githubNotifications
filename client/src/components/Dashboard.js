import React, { useContext, useEffect, useState } from 'react'
import Store from '../context/store'

function Dashboard (props) {
  const context = useContext(Store)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (props.location.search) {
      const token = props.location.search.substring(1).split('access_token=')[1]
      context.authenticate(token)

      props.history.push('/dashboard')

      try {
        context.fetchUser(token, setIsLoading)
        context.fetchOrg(token, setIsLoading)
      } catch (error) {
        setIsError(true)
      }
    }
  }, [])

  if (context.isAuth) {
    return (
      <div className='container'>
        <h1>Dashboard</h1>
        {isError && <div>Something went wrong ...</div>}
        {isLoading && <p className='App-logo'>Loading</p>}
        <div>
          {/* <p>{context.user.name} from {context.user.location}</p>
          {context.orgData.map((d, i) => <p key={i}>{d.login}</p>)}
          <p>{context.name}</p> */}
        </div>
        <div class='main-card card center-align hoverable'>
          <div class='card-tabs'>
            <ul class='tabs tabs-fixed-width'>
              <li class='tab'><a href='#test4'>Test 1</a></li>
              <li class='tab'><a class='active' href='#test5'>Test 2</a></li>
              <li class='tab'><a href='#test6'>Test 3</a></li>
            </ul>
          </div>
          <div class='card-content'>
            <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
          </div>
          <div class='card-content grey lighten-4'>
            <select className='browser-default'>
              {context.orgData.map((d, i) => <option key={i}>{d.login}</option>)}
            </select>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='home'>
        <h1>Please log in</h1>
      </div>
    )
  }
}

export default Dashboard
