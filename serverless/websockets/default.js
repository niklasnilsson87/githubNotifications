'use strict'

const Responses = require('../common/Responses')

exports.handler = async event => {
  console.log('Event: ', event)

  return Responses._200({ message: 'Default' })
}
