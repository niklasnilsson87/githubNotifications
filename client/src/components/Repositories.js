import React, { useContext, useState, useEffect } from 'react'

import Store from '../context/store'

import Pagination from './Pagination'
import NotificationContent from './NotificationContent'

import logo from '../img/giphy.gif'

const Repositories = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [reposPerPage] = useState(5)
  const [isLoading, setIsloading] = useState(false)
  const { reposData } = useContext(Store)

  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = reposData.slice(indexOfFirstRepo, indexOfLastRepo)

  useEffect(() => {
    setIsloading(true)
    setTimeout(() => {
      setCurrentPage(1)
      setIsloading(false)
    }, 500)
  }, [reposData])

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h2 className='center-align'>Repositories</h2>
      {isLoading ? <div className='center-align'> <img src={logo} alt='Loading' /> </div> : (
        <>

          {reposData.length > 5 && (
            <Pagination reposPerPage={reposPerPage} totalRepos={reposData.length} paginate={paginate} />
          )}
          <ul>
            {currentRepos.map((repo, i) =>
              <li key={i}>
                <a className='org-link' target='_blank' rel='noopener noreferrer' href={repo.owner.html_url}>{repo.name}</a>
                <NotificationContent repo={repo} />
                <p style={{ marginLeft: '15px' }}>{repo.description || 'No Description'}</p>
              </li>)}
          </ul>
        </>
      )}
    </div>
  )
}

export default Repositories
