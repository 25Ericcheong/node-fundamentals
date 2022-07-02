// naming convention used to indicate that this is a class
// has tone of useful properties and methods
const EventEmitter = require("events");

const emitter = new EventEmitter(); // this is an object

// emit means make a noise or produce something (signaling that an event has occurred)
// running script will not do anything because there are no listeners created to listen for this
emitter.emit("messageLogged");
