const http = require('http')

// below will always be invoked when user tries to request for something from server via url
const server = http.createServer((req, res) => {
  res.writeHead(
    200, 
    {'content-type' : 'text/html'}
  )
  res.write('<h1>Home page</h1>')
  res.end()
})

server.listen(5000)
