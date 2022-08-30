const { readFile, writeFile } = require('fs')
const  util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

// using the util module within node (dont have to install dependency) will mean that the code below this is not needed
// this code below is needed when trying to read a file asynchronously
// getText = (path) => {
//   return new Promise ((resolve, reject) => {
//     readFile(path, 'utf8', (err, data) => {
//       if (err) {
//         console.log('error')
//         reject(err)
//       } else {
//         console.log('success')
//         resolve(data)
//       }
//     })
//   })
// }

const start = async() => {
  try {
    const first = await readFilePromise('./content/first.txt', 'utf8')
    const second = await readFilePromise('./content/second.txt', 'utf8')
    await writeFilePromise(
      './content/result-mind-grenade.txt', 
      `This is data written: ${first} ${second}`
    )
    console.log(first, second)
  } catch (error) {
    console.log(error)
  }
}

start()
