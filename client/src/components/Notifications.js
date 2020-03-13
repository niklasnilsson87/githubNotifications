import React, { useContext, useEffect } from 'react'

import Store from '../context/store'

const Notifications = () => {
  const { notifications, deleteNotifications } = useContext(Store)

  useEffect(() => {
    return () => {
      if (notifications.length) {
        deleteNotifications()
      }
    }
  }, [])

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div>
      <h2 className='center-align'>Notifications</h2>
      {
        notifications.map((n, i) => (
          <div key={i} className='container'>
            <div className='teal lighten-3 card-panel white-text'>
              <div className='flex justify-between' style={{ maxWidth: '60%' }}>
                <div>
                  <p>Event: {capitalizeFirstLetter(n.event)}</p>
                  {n.action && <p>Action: {n.action}</p>}
                  <p>Sender: {n.sender}</p>
                </div>
                <div>
                  {n.title && <p>Title: {n.title}</p>}
                  <p>Repository: {n.repoName}</p>
                  {n.commit && <p>Commit: {n.commit}</p>}
                </div>
              </div>
              <p>Site: <a href={n.url}>{n.url}</a></p>
            </div>
          </div>
        )
        ).reverse()
      }
    </div>
  )
}

export default Notifications
