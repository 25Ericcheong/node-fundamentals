// naming convention used to indicate that this is a class
// has tone of useful properties and methods
const EventEmitter = require("events");

const emitter = new EventEmitter(); // this is an object

// register a listener
emitter.on("messageLogged", function () {
  console.log("Listener called");
});

// emit means make a noise or produce something (signaling that an event has occurred)
// raises an event or emits an event
emitter.emit("messageLogged");
