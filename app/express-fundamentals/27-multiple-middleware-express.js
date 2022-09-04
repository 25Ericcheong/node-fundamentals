const express = require('express')
const app = express()
const logger = require('./26-logger')
const authorize = require('./27-authorize')

// this will be applied to all routes with /api in it
app.use([logger, authorize])

app.get('/', (req, res) => {
  res.send('Home')
})

app.get('/about', (req, res) => {
  res.send('About')
})

app.get('/api/products', (req, res) => {
  res.send('Products')
})

app.get('/api/items', (req, res) => {
  console.log(req.user)
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
