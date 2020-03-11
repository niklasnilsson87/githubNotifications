import React, { useContext } from 'react'
import Store from '../context/store'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const Chart = () => {
  const { user } = useContext(Store)

  const data = [
    { name: 'Public repos', amount: user.public_repos },
    { name: 'Private repos', amount: user.total_private_repos },
    { name: 'Gists', amount: user.public_gists },
    { name: 'Followers', amount: user.followers },
    { name: 'Following', amount: user.following },
    { name: 'Collaborators', amount: user.collaborators }
  ]

  return (
    <div className='flex justify-space-evenly'>
      <BarChart
        width={600} height={300} data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Bar dataKey='amount' fill='#82ca9d' />
        {/* <Bar type='monotone' dataKey='uv' stroke='#82ca9d' /> */}
      </BarChart>
      <div className='center-align'>
        <div>
          <h5>Repository</h5>
          <p>{user.login}</p>
        </div>
        <div>
          <h5>Location</h5>
          <p>{user.location}</p>
        </div>
      </div>
    </div>
  )
}

export default Chart
