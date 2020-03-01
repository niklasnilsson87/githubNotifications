import React, { useState } from 'react'

const NotificationContent = ({ reposData }) => {
  const events = ['Pull request', 'Issues', 'Commits', 'Push', 'Fork', 'Relese', 'Star', 'Create', 'Delete']
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <i onClick={() => setToggle(!toggle)} className='material-icons grey-text pointer'>arrow_drop_down</i>
      {toggle &&

        events.map((e, i) =>
          <div key={i} className='dropdown'>
            <div className='not-container'>
              <p>{e}</p>
              <div class='switch'>
                <label>
                Off
                  <input type='checkbox' />
                  <span class='lever' />
                On
                </label>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default NotificationContent
