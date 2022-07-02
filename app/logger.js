const EventEmitter = require("events");

var url = "http://mylogger.io/log";

// logger class will now have all properties from EventEmitter
class Logger extends EventEmitter {
  // do not need function since this will now be a method of a class instead
  log(message) {
    // sends http request
    console.log(message);

    // raise an event
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}

module.exports = Logger;
