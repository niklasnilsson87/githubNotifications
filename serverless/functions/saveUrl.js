'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

exports.handler = async event => {
  const data = JSON.parse(event.body)

  const user = await Dynamo.get(data, 'usersTable')

  const obj = {
    ...user,
    slackUrl: data.slackUrl
  }

  await Dynamo.write(obj, 'usersTable')

  return Responses._200(obj)
}
