import React, { useState, useEffect } from 'react'

const Websocket = ({ user, handleNotifications, setSocketGlobal }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (user.id && !socket) {
      const socket = new window.WebSocket(`wss://h9ma6vxrf2.execute-api.us-east-1.amazonaws.com/dev?userid=${user.id}`)

      socket.onopen = () => {
        console.log('Connected to WSS')
      }

      socket.onmessage = ev => {
        handleNotifications(JSON.parse(ev.data))
      }
      setSocket(socket)
      setSocketGlobal(socket)
    }
  }, [user])

  return (
    <div />
  )
}

export default Websocket
