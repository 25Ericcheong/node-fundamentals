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

  const { search, limit } = req.query
  let sortedProducts = [...products];

  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search)
    })
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit))
  }

  res.status(200).json(sortedProducts)
  res.send('Hello')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
