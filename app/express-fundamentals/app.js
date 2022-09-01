const express = require('express')

// alternative to the below line is also
// app = require('express')() - imports module and also invokes it
const app = express()

app.get('/', (req, res) => {
  res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
  res.status(200).send('About Page')
})

app.all('*', (req, res) => {
  res.status(404).send('<h1>Resource not found</h1>')
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
