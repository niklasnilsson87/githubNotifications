import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import Store from '../context/store'

const Navigation = () => {
  const { notifications } = useContext(Store)

  return (
    <ul className='route-links'>
      <li><Link to='/'>Dashboard</Link></li>
      <li><Link to='/notifications'>Notifications {notifications.length ? (<><span>({notifications.length})</span></>) : ''}</Link></li>
      <li><Link to='/repositories'>Repositories</Link></li>
      <li><Link to='/settings'>Settings</Link></li>
    </ul>
  )
}

export default Navigation
