const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to homepage')
    return
  }

  if (req.url === '/about') {
    res.end('Here is the about page')
    return
  }

  res.end('<h1>Page does not exist</h1>')
})

server.listen(3000)
