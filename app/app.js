// node assumes this is built in module and if it doesn't exist - node will look for existing file
const path = require("path");

var pathObj = path.parse(__filename);

console.log(pathObj);
