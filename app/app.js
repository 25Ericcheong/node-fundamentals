const http = require("http");

// create a web server
// server has (inherits) eventEmitter in it too
const server = http.createServer();

server.on("connection", (socket) => {
  console.log("New connection");
});

server.listen(3000);

// server listens to port 3000
console.log("Listening on port 3000");
