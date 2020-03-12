'use strict'

const AWS = require('aws-sdk')
const superagent = require('superagent')
const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.WEBSOCKET_TABLE_NAME

exports.handler = async event => {
  const githubEvent = event.headers['X-GitHub-Event']

  const githubHook = JSON.parse(event.body)
  const hookRepoId = githubHook.repository.id

  const users = await Dynamo.getAllFromTable('usersTable')
  const subscribedUsers = users.filter(user => user.repos
    .find(repo => repo.id === hookRepoId && repo.actions
      .includes(githubEvent)))

  if (subscribedUsers.length) {
    const connectionIDs = await Dynamo.getAllFromTable(tableName)

    for (let i = 0; i < subscribedUsers.length; i++) {
      const user = subscribedUsers[i]

      const conn = connectionIDs.find(c => parseInt(c.user_id) === user.id)
      const payload = createPayload(githubHook, githubEvent)

      if (conn) {
        try {
          await send(payload, conn)
        } catch (error) {
          console.log({ error })
        }
      } else {
        try {
          await superagent
            .post(user.slackUrl)
            .send({
              message: payload.text
            })
          const events = user.events
          events.push(payload)

          const data = {
            ...user,
            events
          }

          await Dynamo.write(data, 'usersTable')
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

function createPayload (data, event) {
  switch (event) {
    case 'issues':
      return {
        event: event,
        action: data.action,
        url: data.issue.url,
        title: data.issue.title,
        body: data.issue.body,
        repoName: data.repository.name,
        sender: data.sender.login,
        text: `*Name:* ${data.sender.login}\n*Event:* ${event}\n*Action:* ${data.action}\n*Title:* ${data.issue.title}\n*Body:* ${data.issue.body}\n*Repository:* ${data.repository.name}`
      }
    case 'push':
      return {
        event: event,
        url: data.repository.url,
        sender: data.sender.login,
        repoName: data.repository.name,
        repoId: data.repository.id,
        commit: data.head_commit.message,
        text: `*Name:* ${data.sender.login}\n*Event:* ${event}\n*Repository:* ${data.repository.name}\n*Commit Message:* ${data.head_commit.message}`
      }
    case 'release':
      return {
        event: event,
        action: data.action,
        url: data.release.url,
        title: data.release.name,
        repoName: data.repository.name,
        sender: data.sender.login,
        text: `*Name:* ${data.sender.login}\n*Event:* ${event}\n*Action:* ${data.action}\n*Repository:* ${data.repository.name}\n*Title:* ${data.release.title}\n*Body:* ${data.release.body}`
      }
    default:
      break
  }
}
