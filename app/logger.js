// complete path to file
console.log(__filename);

// path to directory that contains module
console.log(__dirname);

// as an example
var url = "http://mylogger.io/log";

function log(message) {
  // sends http request
  console.log(message);
}

// adds to exports key of module object with logger key
// module.exports.log = log;

// can replace entire object with a function instead
module.exports = log;
