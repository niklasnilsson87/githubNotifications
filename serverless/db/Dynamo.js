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
    throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
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

module.exports = Dynamo
