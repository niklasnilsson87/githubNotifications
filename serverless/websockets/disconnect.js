'use strict'

const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.WEBSOCKET_TABLE_NAME

exports.handler = async event => {
  console.log('Event: ', event)

  const { connectionId: connectionID } = event.requestContext

  await Dynamo.delete(connectionID, tableName)

  return Responses._200({ message: 'Disconnected' })
}
