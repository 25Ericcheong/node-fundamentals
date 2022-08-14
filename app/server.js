const fs = require('fs');

const content = 'Some content!';

fs.writeFile('./write-test.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
