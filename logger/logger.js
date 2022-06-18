// as an example
var url = "http://mylogger.io/log";

function log(message) {
  // sends http request
  console.log(message);
}

// adds to exports key of module object with logger key
module.exports.log = log;
