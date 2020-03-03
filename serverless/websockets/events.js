'use strict'

const Responses = require('../common/Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.TABLE_NAME

exports.handler = async event => {
  console.log('Event: ', event)

  const { connectionId: connectionID } = event.requestContext

  const body = JSON.parse(event.body)

  try {
    const record = await Dynamo.getRecord(connectionID, tableName)
    const events = record.events

    events.push(body.event)

    const data = {
      ...record,
      events
    }

    await Dynamo.write(data, tableName)
    return Responses._200({ message: 'Got an event' })
  } catch (error) {
    return Responses._400({ message: 'Event could not be received' })
  }
}
