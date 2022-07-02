const http = require("http");

// create a web server
// server has (inherits) eventEmitter in it too
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }
});

server.listen(3000);

// server listens to port 3000
console.log("Listening on port 3000");
