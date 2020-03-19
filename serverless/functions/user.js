'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

const tableName = process.env.USER_TABLE_NAME

exports.handler = async event => {
  const data = JSON.parse(event.body)

  const user = await Dynamo.get(data, tableName)

  if (user) {
    return Responses._200(user)
  }

  const obj = {
    id: data.id,
    name: data.name,
    repos: [],
    events: []
  }

  await Dynamo.write(obj, tableName)

  return Responses._200(obj)
}
