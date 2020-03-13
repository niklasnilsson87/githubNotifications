import React, { useState, useContext } from 'react'
import Store from '../context/store'

const Settings = () => {
  const [url, setUrl] = useState('')
  const { saveUrl, userSettings } = useContext(Store)

  const handleClick = () => {
    if (url.length > 3) {
      saveUrl(url)
      setUrl('')
    }
  }

  return (
    <div>
      <h2 className='center-align'>Settings</h2>
      <div className='container'>
        <p>Insert Slack url to recive notifications</p>
        <input value={url} onChange={event => setUrl(event.target.value)} />
        <button onClick={handleClick} className='btn'>Save</button>
      </div>
      <div className='container'>
        <p className='font-size20'>Active Url</p>
        <p>{userSettings.slackUrl}</p>
      </div>
    </div>
  )
}

export default Settings
