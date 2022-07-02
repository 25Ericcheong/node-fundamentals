const EventEmitter = require("events");
const emitter = new EventEmitter(); // this is an object

var url = "http://mylogger.io/log";

function log(message) {
  // sends http request
  console.log(message);

  // raise an event
  emitter.emit("messageLogged", { id: 1, url: "http://" });
}

module.exports = log;
