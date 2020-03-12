import React, { useContext, useState, useEffect } from 'react'

import Store from '../context/store'

import Paginate from 'react-paginate'
import NotificationContent from './NotificationContent'

import logo from '../img/giphy.gif'

const Repositories = () => {
  const [isLoading, setIsloading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [perPage] = useState(5)
  const [repos, setRepos] = useState([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const { reposData, user, saveUser } = useContext(Store)

  useEffect(() => {
    setIsloading(true)
    setTimeout(() => {
      setIsloading(false)
    }, 500)
    if (reposData) {
      saveUser(user)
      if (offset === 0) {
        setRepos(reposData.slice(offset, perPage))
      }
    }
  }, [reposData])

  const handlePageClick = data => {
    const selected = data.selected
    const offset = Math.ceil(selected * perPage)

    setOffset(offset)

    setRepos(reposData.slice(offset, perPage + offset))
  }

  return (
    <div>
      <h2 className='center-align'>Repositories</h2>
      {isLoading ? <div className='center-align'> <img src={logo} alt='Loading' /> </div> : (
        <>
          <Paginate
            previousLabel='previous'
            nextLabel='next'
            breakLabel='...'
            breakClassName='break-me'
            pageCount={reposData.length / perPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName='pagination'
            subContainerClassName='pages pagination'
            activeClassName='active'
          />
          <ul>
            {repos.map((repo, i) =>
              <li key={i} className='not-li'>
                <div className='inline-flex align-center'>
                  <span className='org-link'>{repo.name}</span>
                  <a className='org-link flex' target='_blank' rel='noopener noreferrer' href={repo.owner.html_url}><i className='material-icons'>open_in_new</i></a>
                </div>
                <NotificationContent repo={repo} isActive={activeIndex === i} onActivation={setActiveIndex} index={i} />
                <p style={{ marginLeft: '15px' }}>{repo.description || 'No Description'}</p>
              </li>)}
          </ul>
        </>
      )}
    </div>
  )
}

export default Repositories
