const express = require('express')
const people = require('./routes/people')
const auth = require('./routes/auth')

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
app.use('/login', auth)


app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
