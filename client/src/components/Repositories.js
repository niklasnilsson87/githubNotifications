import React, { useContext, useState } from 'react'

import Store from '../context/store'

import Pagination from './Pagination'
import NotificationContent from './NotificationContent'

const Repositories = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [reposPerPage] = useState(5)
  const { reposData } = useContext(Store)

  const indexOfLastRepo = currentPage * reposPerPage
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage
  const currentRepos = reposData.slice(indexOfFirstRepo, indexOfLastRepo)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <h2>Repositories</h2>
      {reposData.length > 5 &&
        <Pagination reposPerPage={reposPerPage} totalRepos={reposData.length} paginate={paginate} />}
      <ul>
        {currentRepos.map((r, i) =>
          <li key={i}>
            <a className='org-link' target='_blank' rel='noopener noreferrer' href={r.owner.html_url}>{r.name}</a>
            <NotificationContent reposData={reposData} />
            <p style={{ marginLeft: '15px' }}>{r.description || 'No Description'}</p>
          </li>)}
      </ul>
    </div>
  )
}

export default Repositories
