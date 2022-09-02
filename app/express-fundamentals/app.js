const express = require('express')
const app = express()
const {products} = require('./data')

app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products Page</a>')
})

app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
  console.log(req.params)
  res.send('Hello')
})

app.get('/api/v1/query', (req,res) => {
  console.log(req.query)
  res.send('Hello')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
