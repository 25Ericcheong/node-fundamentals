// naming convention used to indicate that this is a class
// has tone of useful properties and methods
const EventEmitter = require("events");

const Logger = require("./logger");
const logger = new Logger();

// order matters - must have a listener first before emitting something
// register a listener
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

// this calls a method from logger object from logger module which emits or creates an event
logger.log("message");
