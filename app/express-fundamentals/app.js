const express = require('express')
const path = require('path')

const app = express()

// static file will be in this folder
// setup static and middleware
app.use(express.static('./public'))

app.get('/', (req, res) => {

  // path.resolve would require absolute path
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
})

app.all('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
