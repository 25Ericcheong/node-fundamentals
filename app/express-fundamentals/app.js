const http = require('http')
const { readFileSync } = require('fs');

// get all files
// this does not get called at every request made from client - only when server is instantiated
// it would however be invoked at every request if it is in the createServer method
const homePage = readFileSync('./index.html')

// below will always be invoked when user tries to request for something from server via url
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.writeHead(
      200, 
      {'content-type' : 'text/html'}
    )
    res.write('<h1>Home page</h1>')
  }

  else if (url === '/about') {
    res.writeHead(
      200, 
      {'content-type' : 'text/html'}
    )
    res.write('<h1>About page</h1>')
  }

  else {
    res.writeHead(
      404, 
      {'content-type' : 'text/html'}
    )
    res.write('<h1>Page not found</h1>')
  }
  
  res.end()
})

server.listen(5000)
