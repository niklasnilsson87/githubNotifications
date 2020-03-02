import React from 'react'

const Pagination = ({ reposPerPage, totalRepos, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='light-blue lighten-2'>
      <ul className='page flex align-center'>
        <li className='disabled'><i className='material-icons'>chevron_left</i></li>
        {pageNumbers.map(number => (
          <li key={number} className='page-li'>
            <span onClick={() => paginate(number)} href='!#' className='page-number'>
              {number}
            </span>
          </li>
        ))}
        <li className=''><i className='material-icons'>chevron_right</i></li>
      </ul>
    </nav>
  )
}

export default Pagination
