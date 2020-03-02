import React, { useState, useEffect, useContext } from 'react'

import Store from '../context/store'

const NotificationContent = ({ repo }) => {
  const events = ['Issues', 'Commits', 'Push']
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState({ Issues: false, Commits: false, Push: false })
  const { sendHook } = useContext(Store)

  const handleOnChange = e => {
    const checked = e.target.checked
    const key = e.target.id
    setValue({
      ...value,
      [key]: checked
    })
  }

  // useEffect(() => {
  //   console.log(value)
  // }, [value])

  const handleSubmit = () => {
    const hooksToSet = []
    for (const v in value) {
      if (value[v]) {
        hooksToSet.push(v.toLocaleLowerCase())
      }
    }
    sendHook(hooksToSet)
  }

  return (
    <>
      {repo.permissions.admin &&
        <i onClick={() => setToggle(!toggle)} className='material-icons grey-text pointer'>arrow_drop_down</i>}
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
