// const fs = require('fs');

// fs.stat('/Users/joe/test.txt', (err, stats) => {
//   if (err) {
//     console.error(err);
//     return;
//   }

//   stats.isFile(); // true
//   stats.isDirectory(); // false
//   stats.isSymbolicLink(); // false
//   stats.size; // 1024000 //= 1MB
// });

const path = require('path');

const notes = '/users/joe/notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// acquire basename without file extension
path.basename(notes, path.extname(notes)); // notes

const name = 'joe';
path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'

path.resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder

// appends another layer or folder above file indicated in second parameter
path.resolve('tmp', 'joe.txt'); // '/Users/joe/tmp/joe.txt' if run from my home folder

// if the first parameter starts with a slash, that means it's an absolute path
path.resolve('/etc', 'joe.txt'); // '/etc/joe.txt'
