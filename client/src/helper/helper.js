export const fetchData = async (url, token, callback, loading, user) => {
  // const url = 'https://api.github.com/user'
  loading(true)
  const response = await window.fetch(url, {
    headers: {
      Authorization: 'token ' + token,
      'user-agent': user || ''
    }
  })
  const result = await response.json()
  console.log(result)
  callback(result)
  loading(false)
}
