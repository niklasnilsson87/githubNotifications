'use strict'

const superagent = require('superagent')

exports.handler = async event => {
  const { code } = event.queryStringParameters

  const client_id = process.env.CLIENT_ID // eslint-disable-line
  const client_secret = process.env.CLIENT_SECRET // eslint-disable-line

  const response = await superagent
    .post('https://github.com/login/oauth/access_token')
    .send({
      client_id,
      client_secret,
      code
    })
    .set('Accept', 'application/json')

    const { access_token } = response.body // eslint-disable-line

  return {
    statusCode: 301,
    headers: {
      Location: `https://github.niklasdeveloper.nu/dashboard?access_token=${access_token}` // eslint-disable-line
    }
  }
}
