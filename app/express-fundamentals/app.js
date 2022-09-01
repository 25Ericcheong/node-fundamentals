const express = require('express')
const path = require('path')

const app = express()

// static file will be in this folder
// setup static and middleware
app.use(express.static('./public'))

// 2 ways of rendering index files to client
// first is the below and the second is server side rendering (template engine) or just have index file in the public folder as well since by default index  file is sent by server anyway
// app.get('/', (req, res) => {

//   path.resolve would require absolute path
//   res.sendFile(path.resolve(__dirname, './navbar-app/index.html'))
// })

app.all('*', (req, res) => {
  res.status(404).send('Page not found')
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000')
})
