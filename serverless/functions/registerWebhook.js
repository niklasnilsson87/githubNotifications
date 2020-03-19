'use strict'

const Responses = require('../common/Responses')
const fetch = require('node-fetch')

const secret = process.env.SECRET_SIGNATURE

exports.handler = async event => {
  const body = JSON.parse(event.body)
  const { url, accessToken } = body
  console.log(body)
  console.log(secret)

  const config = {
    name: 'web',
    active: true,
    events: ['push', 'issues', 'release'],
    config: {
      url: 'https://github-server.niklasdeveloper.nu/webhook',
      content_type: 'json',
      insecure_ssl: 0,
      secret: secret
    }
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'token ' + accessToken },
      body: JSON.stringify(config)
    })

    const response = await res.json()
    console.log(response)
    console.log('done')
    return Responses._200({ message: 'OK' })
  } catch (error) {
    console.log(error)
    Responses._400({ message: error })
  }
}
