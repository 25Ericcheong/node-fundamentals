const express = require('express')
const app = express()
const logger = require('./26-logger')

app.use(logger)

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
  res.send('About')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
