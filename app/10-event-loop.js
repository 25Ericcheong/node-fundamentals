// first example 
const { readFile } = require('fs')

console.log('started first task')
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
  console.log('completed first task')
})

console.log('starting next task')

// second example
// started os process
console.log("first")

setTimeout(() => {
  console.log("second")
}, 0);

console.log("third")
// completed and exited os process

// third example
// http = require("http")

// const server = http.createServer((req, res) => {
//   console.log("request event")
//   res.end("hello world")
// })

// server.listen(5000, () => {
//   console.log('Server listening on port : 5000 ...')
// })

