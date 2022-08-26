const { readFile } = require('fs')

getText = (path) => {
  return new Promise ((resolve, reject) => {
    readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.log('error')
        reject(err)
      } else {
        console.log('success')
        resolve(data)
      }
    })
  })
}

// previous example - utilizing many then and catch blocks which comes with complexity later on
// getText('./content/first.txt')
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err))
