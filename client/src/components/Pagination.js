import React from 'react'

const Pagination = ({ reposPerPage, totalRepos, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalRepos / reposPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className='light-blue lighten-2'>
      <ul className='pagination page'>
        <div className='link-container'>
          <li className='disabled'><span href='#!'><i className='material-icons'>chevron_left</i></span></li>
          {pageNumbers.map(number => (
            <li key={number} className='page-li'>
              <span onClick={() => paginate(number)} href='!#' className='page-number'>
                {number}
              </span>
            </li>
          ))}
          <li className=''><span href='#!'><i className='material-icons'>chevron_right</i></span></li>
        </div>
      </ul>
    </nav>
  )
}

export default Pagination
