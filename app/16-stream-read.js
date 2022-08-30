const { createReadStream } = require('fs')

const stream = createReadStream(
  './content/big.txt', 
  { highWaterMark: 90000 }
)

// an event called data is used here to read the big file
// by default it is 64kb for each chunk - this can be changed with highWaterMark
stream.on('data', (result) => {
  console.log(result)
})

stream.on('error', (err) => {
  console.log(err)
})
