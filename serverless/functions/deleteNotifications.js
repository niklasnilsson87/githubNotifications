'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

exports.handler = async event => {
  const { id, name } = event.queryStringParameters
  const data = {
    id: parseInt(id),
    name: name
  }

  const user = await Dynamo.get(data, 'usersTable')

  const obj = {
    ...user,
    events: []
  }

  await Dynamo.write(obj, 'usersTable')

  return Responses._200({ message: 'OK', obj })
}
