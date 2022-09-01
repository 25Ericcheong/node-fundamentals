const express = require('express')

// alternative to the below line is also
// app = require('express')() - imports module and also invokes it
const app = express()

app.get('/', (req, res) => {
  res.send('Home page')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})

// most widely used methods
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
