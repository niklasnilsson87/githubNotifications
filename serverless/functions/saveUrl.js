'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

const tableName = process.env.USER_TABLE_NAME

exports.handler = async event => {
  const data = JSON.parse(event.body)

  const user = await Dynamo.get(data, tableName)

  const obj = {
    ...user,
    slackUrl: data.slackUrl
  }

  await Dynamo.write(obj, tableName)

  return Responses._200(obj)
}
