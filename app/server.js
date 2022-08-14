const server = http.createServer((req, res) => {
  // we can access HTTP headers
  req.on('data', chunk => {
    console.log(`Data chunk available: ${chunk}`);
  });
  req.on('end', () => {
    // end of data
  });
});
