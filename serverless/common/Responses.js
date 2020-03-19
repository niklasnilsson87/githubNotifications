const Responses = {}

Responses._200 = (data = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 200,
    body: JSON.stringify(data)
  }
}

Responses._400 = (data = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 400,
    body: JSON.stringify(data)
  }
}

Responses._401 = (data = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 401,
    body: JSON.stringify(data)
  }
}

Responses._403 = (data = {}) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    },
    statusCode: 403,
    body: JSON.stringify(data)
  }
}

module.exports = Responses
