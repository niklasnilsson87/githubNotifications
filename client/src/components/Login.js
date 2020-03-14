import React from 'react'

const Login = () => {
  const clientID = '40d5dac15b033ccf08d5'

  return (
    <div className='login'>
      <div className='card center-align'>
        <div className='card-image'>
          <img className='gh-icon' src='https://github.githubassets.com/images/modules/open_graph/github-logo.png' alt='Github' />
        </div>
        <div className='card-content'>
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user,repo,admin:org_hook,admin:repo_hook`}
            className='btn-small grey darken-4'
          >
            Login to GitHub
          </a>
        </div>
      </div>

    </div>
  )
}

export default Login
