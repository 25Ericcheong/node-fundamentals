const fs = require("fs");

// returns all files in current directory
const files = fs.readdirSync("./");

console.log(files);
