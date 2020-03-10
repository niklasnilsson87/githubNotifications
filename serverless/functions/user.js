'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

// const tableName = process.env.USER_TABLE_NAME

exports.handler = async event => {
  const data = JSON.parse(event.body)

  const user = await Dynamo.get(data, 'usersTable')

  if (user) {
    return Responses._200(user)
  }

  const timestamp = new Date().getTime()

  const obj = {
    id: data.id,
    name: data.name,
    slackUrl: data.slackUrl || '',
    createdAt: timestamp,
    updatedAt: timestamp,
    repos: []
  }

  await Dynamo.write(obj, 'usersTable')

  return Responses._200(obj)
}
