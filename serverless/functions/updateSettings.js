'use strict'

const Dynamo = require('../common/Dynamo')
const Responses = require('../common/Responses')

const tableName = process.env.USER_TABLE_NAME

exports.handler = async event => {
  const data = JSON.parse(event.body)
  try {
    await Dynamo.update(data, tableName)
    return Responses._200({ message: 'OK' })
  } catch (error) {
    console.log({ error })
    Responses._400({ message: 'Error', error: error })
  }
}
