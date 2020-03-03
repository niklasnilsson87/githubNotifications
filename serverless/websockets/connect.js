'use strict'

const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.TABLE_NAME

exports.handler = async event => {
  console.log('Event: ', event)

  const { connectionId: connectionID } = event.requestContext

  const data = {
    id: connectionID,
    date: Date.now(),
    events: []
  }

  await Dynamo.write(data, tableName)

  return Responses._200({ message: 'Connected' })
}
