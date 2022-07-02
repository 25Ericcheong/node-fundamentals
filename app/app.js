// naming convention used to indicate that this is a class
// has tone of useful properties and methods
const EventEmitter = require("events");

const emitter = new EventEmitter(); // this is an object

// order matters - must have a listener first before emitting something
// register a listener
emitter.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

const log = require("./logger");

// this will only console log message instead of the object in logger.js
// this is the case because both files have different emitter objects
log("message");
