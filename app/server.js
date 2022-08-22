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
const http = require("http")

const server = http.createServer((req, res) => {

if (req.url === '/') {
  res.end('Home page')
  return;
}

if (req.url === '/about') {

  // blocking code
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 1000; j++) {
      console.log(`${i} ${j}`)
    }
  }

  res.end('About page')
  return;
}

res.end('Error page')
  
})

server.listen(5000, () => {
  console.log("Server listening on port 5000...")
})
