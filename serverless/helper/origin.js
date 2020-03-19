'use strict'

const Responses = require('../common/Responses')

const allowedOrigin = (origin) => {
  if (origin !== 'https://github.niklasdeveloper.nu') {
    console.log('incomming origin :', origin)
    return Responses._403({ Message: 'User not allowed' })
  }
}

module.exports = {
  allowedOrigin
}
