const express = require('express')
const people = require('./routes/people')

const app = express()

// static assets
app.use(express.static('./methods-public'))

// parse form data 
// parses incoming data from client
// note: app.use would apply all routes with this built-in express middleware
app.use(express.urlencoded({ extended: false }))

// parse json - for straight up http request (not form data)
// additional middleware to parse
app.use(express.json())

// will only be applied to the ones with /api/people
// /api/people is the base path
app.use('/api/people', people)

app.post('/login', (req, res) => {
  const { name } = req.body

  if (name) {
    return res.status(200).send(`Welcome ${name}`)
  }

  res.status(401).send('Please provide credentials')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
