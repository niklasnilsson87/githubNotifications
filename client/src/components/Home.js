import React, { useEffect, useState } from 'react'
import { fetchData } from '../helper/helper'

function Home (props) {
  const [isAuth, setisAuth] = useState(false)
  const [orgData, setOrgData] = useState([])
  const [user, setUser] = useState({ hits: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (props.location.search) {
      const token = props.location.search
        .substring(1)
        .split('access_token=')[1]

      setisAuth(true)
      props.history.push('/home')

      try {
        fetchData('https://api.github.com/user', token, setUser, setIsLoading)
        fetchData('https://api.github.com/user/orgs', token, setOrgData, setIsLoading, orgData.name)
      } catch (error) {
        setIsError(true)
      }
    }
  }, [])

  if (isAuth) {
    return (
      <div className='home'>
        <h1>Login success</h1>
        {isError && <div>Something went wrong ...</div>}
        {isLoading && <p className='App-logo'>Loading</p>}
        <div>
          <p>{user.name} from {user.location}</p>
          {orgData.map((d, i) => <p key={i}>{d.login}</p>)}
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

export default Home
