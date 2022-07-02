const http = require("http");

// create a web server
// server has (inherits) eventEmitter in it too
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello world");
    res.end();
  }

  // that is only 1 route, for backend, need to be able to handle various routes
  if (req.url === "/api/courses") {
    // return an array of object using JSON
    // just an example to return an array of numbers
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

server.listen(3000);

// server listens to port 3000
console.log("Listening on port 3000");
