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

Dynamo.update = async (data, TableName) => {
  if (!data.id) {
    throw Error('no ID on the data')
  }

  const user = await Dynamo.get(data, TableName)
  const repos = user.repos

  if (data.repo.actions.length === 0) {
    const update = repos.filter(repo => repo.id !== data.repo.id)

    const updatedData = {
      ...user,
      repos: update
    }

    const res = await Dynamo.write(updatedData, TableName)
    return res
  }

  if (repos.length) {
    const repo = repos.find(r => r.id === data.repo.id)
    const newRepo = repo
    if (newRepo) {
      newRepo.actions = []
      newRepo.actions = data.repo.actions
      repos[repos.indexOf(repo)] = newRepo
    } else {
      repos.push(data.repo)
    }
  } else {
    repos.push(data.repo)
  }

  const updatedData = {
    ...user,
    repos
  }

  const res = await Dynamo.write(updatedData, TableName)

  if (!res) {
    throw Error(`There was an error inserting ID of ${data.id} in table ${TableName}`)
  }
}

Dynamo.getAllFromTable = async (TableName) => {
  const params = {
    TableName
  }

  const scanResults = []
  let items

  do {
    items = await documentClient.scan(params).promise()

    items.Items.forEach((item) => scanResults.push(item))
    params.ExclusiveStartKey = items.LastEvaluatedKey
  } while (items.LastEvaluatedKey !== undefined)

  return scanResults
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
