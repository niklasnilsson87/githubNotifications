klient -> lambda såklart!!

klient skickar obj till lambda

```js
{
    "user": "124450123",
    
}

```

skicka till github url: https://api.github.com/repos/nnilsson87/1dv021/hooks

skicka POST
```js
{
  "name": "web",
  "active": true,
  "events": [
    "push",
    "issues"
  ],
  "config": {
    "url": "https://github-server.niklasdeveloper.nu/notification",
    "content_type": "json",
    "insecure_ssl": "0"
  }
}
```

response från github

```js
{
  "id": 1,
  "url": "https://api.github.com/orgs/octocat/hooks/1",
  "ping_url": "https://api.github.com/orgs/octocat/hooks/1/pings",
  "name": "web",
  "events": [
    "push",
    "pull_request"
  ],
  "active": true,
  "config": {
    "url": "http://example.com",
    "content_type": "json"
  },
  "updated_at": "2011-09-06T20:39:23Z",
  "created_at": "2011-09-06T17:26:27Z"
}
```