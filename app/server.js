// Example: Read a file and change its content and read
// it again using callback-based API.
// const fs = require('fs');

// const fileName = '/Users/joe/test.txt';
// fs.readFile(fileName, 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data);
//   const content = 'Some content!';
//   fs.writeFile(fileName, content, err2 => {
//     if (err2) {
//       console.log(err2);
//       return;
//     }
//     console.log('Wrote some content!');
//     fs.readFile(fileName, 'utf8', (err3, data3) => {
//       if (err3) {
//         console.log(err3);
//         return;
//       }
//       console.log(data3);
//     });
//   });
// });

// =========================================================
// NOTE DIFFERENCE IN READABILITY

// Example: Read a file and change its content and read
// it again using promise-based API.
// const fs = require('fs/promises');

// async function example() {
//   const fileName = '/Users/joe/test.txt';
//   try {
//     const data = await fs.readFile(fileName, 'utf8');
//     console.log(data);

//     const content = 'Some content!';
//     await fs.writeFile(fileName, content);

//     console.log('Wrote some content!');
//     const newData = await fs.readFile(fileName, 'utf8');
//     console.log(newData);

//   } catch (err) {
//     console.log(err);
//   }
// }
// example();

// left the above for reference

const { readFile, writeFile } = require('fs')
const  util = require('util')
const readFilePromise = util.promisify(readFile)
const writeFilePromise = util.promisify(writeFile)

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
