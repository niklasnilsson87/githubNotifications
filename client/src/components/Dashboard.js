import React from 'react'

import Chart from './Chart.js'

function Dashboard ({ isUser }) {
  return (
    <div className='dashboard'>
      <h2 className='center-align'>Dashboard</h2>
      <Chart isUser={isUser} />
    </div>
  )
}

export default Dashboard
