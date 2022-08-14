// assuming data passed will be in this format
// {
//  todo: 'Buy the milk',
// }

// const server = http.createServer((req, res) => {
//   let data = '';

//   // assuming string is being passed here
//   req.on('data', chunk => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     console.log(JSON.parse(data).todo); // 'Buy the milk'
//     res.end();
//   });
// });

// from Node.js v10 for await .. of syntax is available which simplifies the code above to the following

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const data = Buffer.concat(buffers).toString();

  console.log(JSON.parse(data).todo); // 'Buy the milk'
  res.end();
});
