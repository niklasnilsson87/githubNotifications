'use strict'

const AWS = require('aws-sdk')

const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.WEBSOCKET_TABLE_NAME

exports.handler = async event => {
  // console.log('Event: ', event)
  const githubEvent = event.headers['X-GitHub-Event']

  const githubHook = JSON.parse(event.body)
  const hookRepoId = githubHook.repository.id

  const users = await Dynamo.getAllFromTable('usersTable')

  const subscribedUsers = users.filter(user => user.repos.find(repo => repo.id === hookRepoId && repo.actions.includes(githubEvent)))

  console.log({ subscribedUsers })

  if (subscribedUsers.length) {
    const connectionIDs = await Dynamo.getAllFromTable(tableName)
    console.log({ connectionIDs })

    for (let i = 0; i < subscribedUsers.length; i++) {
      const user = subscribedUsers[i]

      const conn = connectionIDs.find(c => parseInt(c.user_id) === user.id)

      console.log({ conn })

      if (conn) {
        console.log('should send websocket')
        try {
          await send(githubHook, conn)
          console.log('socket sent!!')
        } catch (error) {
          console.log({ error })
        }
      }
    }
  }

  return Responses._200({ message: 'OK' })
}

function create () {
  const endpoint = 'h9ma6vxrf2.execute-api.us-east-1.amazonaws.com/dev'
  return new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint
  })
}

function send (githubHook, conn) {
  const ws = create()

  const postParams = {
    Data: JSON.stringify(githubHook),
    ConnectionId: conn.id
  }

  return ws.postToConnection(postParams).promise()
}
