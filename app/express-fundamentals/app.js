const express = require('express')
const app = express()
let { people } = require('./data')

// static assets
app.use(express.static('./methods-public'))

// parse form data 
// parses incoming data from client
app.use(express.urlencoded({ extended: false }))

app.get('/api/people', (req, res) => {
  res.status(200).json({
    success: true,
    data: people
  })
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.send('Success')
})

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})
