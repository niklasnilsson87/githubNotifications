import React, { useContext, useEffect, useState } from 'react'
import Store from '../context/store'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const Chart = ({ isUser }) => {
  const { user, fetchEvents, reposData } = useContext(Store)
  const [events, setEvents] = useState([])

  const data = [
    { name: 'Public repos', amount: user.public_repos },
    { name: 'Private repos', amount: user.total_private_repos },
    { name: 'Gists', amount: user.public_gists },
    { name: 'Followers', amount: user.followers },
    { name: 'Following', amount: user.following },
    { name: 'Collaborators', amount: user.collaborators }
  ]

  useEffect(() => {
    if (!isUser) {
      fetchEvents().then(events => {
        setEvents(events)
      })
    }
  }, [reposData])

  const userDashboard = () => (
    <div className='flex justify-space-evenly'>
      <BarChart
        width={500} height={300} data={data}
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis dataKey='name' />
        <YAxis />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Legend />
        <Bar dataKey='amount' fill='#82ca9d' />
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

  const organizationDashboard = () => {
    const pushes = events.filter(event => event.type === 'PushEvent').length
    const issuesComments = events.filter(event => event.type === 'IssueCommentEvent').length
    const forks = events.filter(event => event.type === 'ForkEvent').length
    const creates = events.filter(event => event.type === 'CreateEvent').length
    const pulls = events.filter(event => event.type === 'PullRequestEvent').length
    const releases = events.filter(event => event.type === 'ReleaseEvent').length

    const data = [
      { name: 'Push', amount: pushes },
      { name: 'Issue', amount: issuesComments },
      { name: 'Forks', amount: forks },
      { name: 'Creates', amount: creates },
      { name: 'Pull Requests', amount: pulls },
      { name: 'Release', amount: releases }
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
        </BarChart>
        <div className='center-align'>
          <div>
            <h5>Events</h5>
            <p>{events.length}</p>
          </div>
        </div>
      </div>
    )
  }

  return isUser ? userDashboard() : organizationDashboard()
}

export default Chart
