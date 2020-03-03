const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {}

Dynamo.write = async (data, TableName) => {
  if (!data.id) {
    throw Error('no ID on the data')
  }

  const params = {
    TableName,
    Item: data
  }

  const res = await documentClient.put(params).promise()

  if (!res) {
    throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`)
  }

  return data
}

Dynamo.get = async ({ id, name }, TableName) => {
  const params = {
    TableName,
    Key: {
      id,
      name
    }
  }

  const data = await documentClient.get(params).promise()
  console.log('DATAITEM:::::::', data.Item)
  return data.Item
}

Dynamo.getRecord = async (id, TableName) => {
  const params = {
    TableName,
    Key: {
      id
    }
  }

  const data = await documentClient.get(params).promise()

  if (!data || !data.Item) {
    throw Error(`There was an error fetching the data for ID of ${id} from ${TableName}`)
  }

  console.log(data)
  return data.Item
}

Dynamo.delete = async (id, TableName) => {
  const params = {
    TableName,
    Key: {
      id
    }
  }

  return documentClient.delete(params).promise()
}

module.exports = Dynamo
