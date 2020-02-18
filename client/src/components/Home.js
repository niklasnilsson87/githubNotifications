import React, { useEffect, useState } from 'react'

function Home (props) {
  const [isAuth, setisAuth] = useState(false)
  const [data, setData] = useState({ hits: [] })
  const [orgs, setOrgs] = useState({ hits: [] })
  const [isLoading, setisLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log(props)
    if (props.location.search !== '') {
      const query = props.location.search.substring(1)
      const token = query.split('access_token=')[1]
      console.log(token)
      setisAuth(true)
      props.history.push('/home')

      const fetchData = async () => {
        setisLoading(true)

        try {
          const url = 'https://api.github.com/user'
          const response = await window.fetch(url, {
            headers: { Authorization: 'token ' + token }
          })
          const result = await response.json()
          console.log(result)
          setOrgs(result)
          setisLoading(false)
        } catch (error) {
          setIsError(true)
        }
      }

      const fetchOrgs = async () => {
        try {
          const response = await window.fetch('https://api.github.com/user/orgs', {
            headers: {
              Authorization: 'token ' + token,
              'user-agent': data.name
            }
          })
          const result = await response.json()
          console.log(result)
          setData(result)
          setisLoading(false)
        } catch (error) {
          setIsError(true)
        }
      }

      fetchData()
      fetchOrgs()
      console.log(orgs)
    }
  }, [])

  if (isAuth) {
    return (
      <div className='home'>
        <h1>Login success</h1>
        {isError && <div>Something went wrong ...</div>}
        {isLoading && <p className='App-logo'>Loading</p>}
        <div>
          <p>{orgs.name} from {orgs.location}</p>
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
