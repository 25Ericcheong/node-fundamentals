// returns the exports module which is a dictionary
// before changes were made
// const logger = require("./logger");

// after changes were made
const log = require("./logger.js");

// this is when we imported an entire object - before
// logger.log("Test logging module");

// this is when we only import a function instead - after
log("Test logging moodule with only a single function");
