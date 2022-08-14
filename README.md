# Node Fundamentals

Started this repository with watching a quick intro to what Node is. Now going through each chapter / section listed in this link - https://nodejs.dev/learn/introduction-to-nodejs

The plan after this is to then watch the following video: https://www.youtube.com/watch?v=Oe421EPjeBE and then create projects with it: https://www.youtube.com/watch?v=qwfE7fSVaZM

## Node.js Learn

### Key features

- Runs single process without creating a new thread for every request (single thread used to handle multiple request)
- Having to create new thread for each new request would mean inefficient use of resources. At some point, maximum number of threads server can provide to client will be reached. This meant that following requests will need to wait for a new thread to be available.
- To increase maximum number of threads; need more hardware.
- Standard libraries written to be non-blocking (asynchronous)
- Thread will not be blocked (which wastes CPU cycles). Example - single thread will be used to handle request heavy 1 and while that request is being processed, the single thread is used to handle a different requeest. When heavy request 1 is completed, a message is sent to event queue and Node.js would continuously monitor this. Any message found in this queue will be taken out and processed by Node.js (making it ideal for I/O-intensive apps - disk or networking associated task but not for CPU-intensitve apps) (1)

### Exiting Process

- Send a signal: `SIGTERM` which gracefully ends process. Allow program to complete before terminating. `SIGKILL` terminates process on the spot - much like `process.exit()`

### Environment Variables

- To be accessed in code when and where there will be change based on environment
- Would also be used to externalize environment specific aspects of app. So no change required in code then
- Eg of when to use: which HTTP port to listen to, what path and folder your files are located in and pointing to a development, staging or production database (3)
- Can be used via command line, or including all environment variables in a .env file,
- Reading a .env file can be done with dotenv package and can be acquired with `npm install dotenv` (this is a runtime dependency) and can then use its config function. More can be found in branch no. 5.
- Environment variables can be imported into a single file which will be used by all other files which the single file would export as a module. Will need to manually add additional variables to config file (which reads .env file) but this can be done automatically as well.
- Can also use a library to read and export them in a module
- It is preferred to not have runtime dependency. Will neeed to save it as a dev dependency with this command `npm install dotenv --save-dev`. Then remove any code that uses require on dotenv including `dotenv.config()`. Can then run code using `-require` which is also `-r` to preload dotenv. Will be useful when you want app to run somewhere file may not exist like running docket container or cloud server.
- Can leverage this with npm scripts.

### Accepting Arguments from Command Line

- Arguments an be a value or a key and a value. Can be retrieved using `process` object built into Node.js which expose an `argv` property that contains all command line invocation arguments. First is the full path of `node` command, second is full path of file being executed and all additional arguments are present from third position going forward.

### Output to Command Line

- With `console` module, can use `console.count()` to check number of time a variable has been checked. `console.count()` can also be used with a loop and if only a variable is passed into it, it logs the number of time this variable (or value) has been found or checked.
- `console.trace()` will also print stack trace allowing better understanding of 'where did this code come from'
- Can also measure how long a specific code took to run with `time(variableName)` and `timeEnd(variableName)`

### Expose Functionality from Node using Exports

- To import something, use `const library = require('./library')`. 2 ways to export, `module.exports` and `exports`. First exposes object it points to and latter exposes properties of the objeect it points to. Worth noting that if `module.exports` is executed first, it would replace the `exports.Property` export.

### NPM

- Useful commands that can be added after `npm install <package-name>` like:

  `--save-dev` which installs and adds entry to `package.json` file _devDependencies_

  `--no-save` which installs but does not add entry to `package.json` file _dependencies_

  `--save-optional` which installs and adds entry to `package.json` file _optionalDependencies_

  `--no-optional` which prevents optional dependencies from being installed

  _devDependencies_ and _dependencies_ differences would be that the former contains dev tools like testing library while the latter is bundled with app in production

- Versioning: `npm update` is used to check all dependencies are within the listed versioning constraints.
- Running Tasks: `npm runn <task-name>`. Task name can be found within `scripts` object in the `package.json` which can be used instead of typing out long command.
- `npm install -g package-name` is a global install. Running `npm root -g` will give indication of where dependency that has been installed for global use is currently located
- `package-lock.json` is used to keep track of the exact version of every package that is installed to ensure product is reproducible always.
- `npm list` lists all installed dependencies (lists all dependnecies that top level dependencies depend on as well). `npm list --depth=0` will only display top level packages. To view latest available version for a package on npm repo - `npm view package_name version`
- `npm list -g --depth 0` will list all globally installed packages
- Development packages not needed for production are like - testing packages, webpack or Babel

### Process.nextTick()

- Node.js event loop, every time an event loop takes a full trip, it is called a tick. Passing function into `process.nextTick()` means that we instruct engine to invoke function at the end of current operation before next event loop tick starts
- `setTimeout(() => {}, 0)` executes function at the end of next tick which is later than `nextTick()`. Use `nextTick()` when you want that particular code to be used before beginning of next tick

### setImmediate()

- To execute some piece of code asynchronously, as soon as possible. Option is to use `setImmediate()`. Callback function is executed in the next iteration of the event loop.
- Difference between this from `setTimeout(() => {}, 0)`, `process.nextTick()` and `Promise.then()`?:

  `process.nextTick()` is executed on current iteration of event loop, after current operation ends. Meaning, befor `setTimeout` and `setImmediate`

  `setTimeout()` is similar ot `setImmediate()` - both will run in the next iteration of event loop

  `process.nextTick` callback is added to `process.nextTick queue`. `Promise.then()` callback is added to `promises microtask queue`. A `setTmeout`, `setImmediate` callback is added to macrotask queue.

  Event loop executes tasks in `process.nextTick queue` first, then `promises microtask queue` and lastly, `macrotask queue`.

### JavaScript Promimses

- Vital to understanding `async` and `await`. Promises are also usedi n Web APIs like Battery API, Fetch API and Service Workers
- An example of chaining promises with the `Node's Fetch API`. https://nodejs.dev/learn/understanding-javascript-promises#consuming-a-promise. In this example, code is used to extract data from a 'todo' json file, a custom function is used to handle the response when the code attempts to load the file. This function would either shortcut the code and produces and error or outputs the response - this is heavily dependent on the status code. The Fetch API returns an object that will either have a `json` or `text` method which can be called. In this case the `json` method was called as the file has a `.json` type.
- `throw new Error('Error')` and `reject('Error')` will fail a promise and trigger the code to look for the nearest `catch()` statement down the chain.
- **Orchestrating promises** is used to synchronize different promises. `Promise.all()` can be used to execute a list of promise and executing something when all promises have been resolved.
- `Promise.race()` is used to execute a promises that finishes first within a list of promises.
- `Promise.any()` is used to return a single promise that resolves within a list of promises. However, if all promises are rejected, `AggregateError` would be ouputted instead.

# Useful Node Modules

## nodemon

- Can be used to restart application automatically when a change is made to file. Instructions can be found here: https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line

## inquirer

- Can be used to inquire input from user and provide all types of inputs for user interact with. https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs

## Modules for Global System Usage Across Projects

- `npm`, `vue-cli`, `grunt-cli`, `mocha`, `react-native-cli`, `gatsby-cli`, `forever` and `nodemon`

# Additional JavaScript information

## JavaScript is a compiled language

- JavaScript used to be an interpreted language (line by line execution) but is now a compiled language (2)

References:

1. How Node.js Works | Mosh: https://www.youtube.com/watch?v=jOupHNvDIq8
2. JavaScript - is it Compiled or Interpreted?: https://almogad.medium.com/javascript-is-it-compiled-or-interpreted-9779278468fc
3. Node.js Everywhere with Environment Variables: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
