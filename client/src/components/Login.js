import React from 'react'

function Login () {
  const clientID = '40d5dac15b033ccf08d5'

  return (
    <div className='login'>
      <a href={`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user,repo,admin,org_hook&redirect_url='${window.location.href}'`}>
        Login to github
      </a>
    </div>
  )
}

export default Login
