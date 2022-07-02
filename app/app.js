// naming convention used to indicate that this is a class
// has tone of useful properties and methods
const EventEmitter = require("events");

const emitter = new EventEmitter(); // this is an object

// order matters - must have a listener first before emitting something
// register a listener
emitter.on("messageLogged", function (arg) {
  console.log("Listener called", arg);
});

// raises an event or emits an event
// most of the time want to send information or data
// best practice is to send data as an object
emitter.emit("messageLogged", { id: 1, url: "http://" });
