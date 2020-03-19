'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

const tableName = process.env.USER_TABLE_NAME

exports.handler = async event => {
  const { id, name } = event.queryStringParameters
  const data = {
    id: parseInt(id),
    name: name
  }

  const user = await Dynamo.get(data, tableName)

  const obj = {
    ...user,
    events: []
  }

  await Dynamo.write(obj, tableName)

  return Responses._200({ message: 'OK', obj })
}
