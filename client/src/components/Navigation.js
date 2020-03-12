import React from 'react'

import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <ul className='route-links'>
      <li><Link to='/'>Dashboard</Link></li>
      <li><Link to='/notifications'>Notifications</Link></li>
      <li><Link to='/repositories'>Repositories</Link></li>
      <li><Link to='/settings'>Settings</Link></li>
    </ul>
  )
}

export default Navigation
