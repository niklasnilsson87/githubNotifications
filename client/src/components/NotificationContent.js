import React, { useState, useEffect, useContext } from 'react'

import Store from '../context/store'

const NotificationContent = ({ repo }) => {
  const events = ['Issues', 'Release', 'Push']
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState({ Issues: false, Release: false, Push: false })
  const { sendHook, userSettings } = useContext(Store)

  const handleOnChange = e => {
    const checked = e.target.checked
    const key = e.target.id
    setValue({
      ...value,
      [key]: checked
    })
  }

  useEffect(() => {
    const savedSettings = userSettings.repos.find(e => e.id === repo.id)
    if (savedSettings) {
      setValue(
        savedSettings.actions
          .map(capitalizeFirstLetter)
          .reduce((obj, key) => ({ ...obj, [key]: true }),
            { Release: false, Issues: false, Push: false }
          )
      )
    }
  }, [])

  function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleSubmit = () => {
    const hooksToSet = []
    for (const v in value) {
      if (value[v]) {
        hooksToSet.push(v.toLocaleLowerCase())
      }
    }
    sendHook(hooksToSet, repo)
  }

  return (
    <>
      {repo.permissions.admin &&
        <div onClick={() => setToggle(!toggle)} className='notification-setting'>
          <span className='not-text'>Edit Notifications</span>
          <i className='material-icons grey-text pointer'>arrow_drop_down</i>
        </div>}
      {toggle && (
        <div>
          {events.map((e, i) =>
            <div key={i} className={toggle ? 'collapseActive' : 'collapse'}>
              <div className='not-container'>
                <p>{e}</p>
                <div className='switch'>
                  <label htmlFor={e}>
                    Off
                    <input
                      type='checkbox'
                      checked={value[e]}
                      id={e}
                      onChange={handleOnChange}
                    />
                    <span className='lever' />
                    On
                  </label>
                </div>
              </div>
            </div>
          )}
          <button onClick={handleSubmit} className='btn'>Save Hook</button>
        </div>
      )}
    </>
  )
}

export default NotificationContent
