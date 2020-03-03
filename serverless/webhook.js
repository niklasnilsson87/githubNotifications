'use strict'

const Responses = require('./common/Responses')
// const Dynamo = require('./common/Dynamo')

const tableName = process.env.TABLE_NAME

exports.handler = async event => {
  console.log('Event: ', event)

  //   const body = JSON.parse(event.body)

  return Responses._200({ message: 'OK' })
}
