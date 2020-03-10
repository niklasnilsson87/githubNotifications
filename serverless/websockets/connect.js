'use strict'

const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.WEBSOCKET_TABLE_NAME

exports.handler = async event => {
  console.log('Event: ', event)

  const { connectionId: connectionID } = event.requestContext
  const { userid } = event.queryStringParameters
  console.log(userid)

  const data = {
    id: connectionID,
    date: Date.now(),
    user_id: userid
  }

  await Dynamo.write(data, tableName)

  return Responses._200({ message: 'Connected' })
}
