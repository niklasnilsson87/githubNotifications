'use strict'

const Dynamo = require('./common/Dynamo')

module.exports.handler = async event => {
  const data = JSON.parse(event.body)

  console.log('DATA BEFORE GET:::::::::', data)
  const user = await Dynamo.get(data, 'usersTable')
  console.log('USER IN USER:::::::::::', user)

  if (user) {
    return {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200,
      body: JSON.stringify(user)
    }
  }

  const timestamp = new Date().getTime()

  const obj = {
    id: data.id,
    name: data.name,
    slackUrl: data.slackUrl || '',
    createdAt: timestamp,
    updatedAt: timestamp
  }

  await Dynamo.write(obj, 'usersTable')

  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(obj)
  }
}
