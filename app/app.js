const fs = require("fs");

// synchronously returns all files in current directory
const files = fs.readdirSync("./");
console.log(files);

// asynchronously returns all files in current directory
fs.readdir("./", function (err, files) {
  if (err) console.log("Error", err);
  else console.log("Result", files);
});
