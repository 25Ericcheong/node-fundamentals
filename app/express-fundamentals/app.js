const express = require('express')
const app = express()
const logger = require('./26-logger')

app.get('/', logger, (req, res) => {
  res.send('Home')
})

app.get('/about', logger, (req, res) => {
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
