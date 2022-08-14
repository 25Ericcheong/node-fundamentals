// assuming data passed will be in this format
// {
//  todo: 'Buy the milk',
// }

const server = http.createServer((req, res) => {
  let data = '';

  // assuming string is being passed here
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    console.log(JSON.parse(data).todo); // 'Buy the milk'
    res.end();
  });
});
