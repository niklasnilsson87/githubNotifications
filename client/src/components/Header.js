import React, { useContext } from 'react'

import Store from '../context/store'

const Header = () => {
  const context = useContext(Store)

  return (
    <nav className='light-blue lighten-1' role='navigation'>
      <div className='nav-wrapper container flex justify-between align-center'><a id='logo-container' href='#' className='logo'>Github Notifications</a>
        {context.isAuth && (
          <button className='btn' onClick={() => context.logout()}>Logout</button>
        )}
      </div>
    </nav>
  )
}

export default Header
