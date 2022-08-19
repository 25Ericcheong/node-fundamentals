# Node Fundamentals

Started this repository with watching a quick intro to what Node is. Now going through each chapter / section listed in this link - https://nodejs.dev/learn/introduction-to-nodejs

The plan after this is to then watch the following video: https://www.youtube.com/watch?v=Oe421EPjeBE and then create projects with it: https://www.youtube.com/watch?v=qwfE7fSVaZM (then proceed to creating my very own side project for fun)

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

### JavaScript Promises

- Vital to understanding `async` and `await`. Promises are also usedi n Web APIs like Battery API, Fetch API and Service Workers
- An example of chaining promises with the `Node's Fetch API`. https://nodejs.dev/learn/understanding-javascript-promises#consuming-a-promise. In this example, code is used to extract data from a 'todo' json file, a custom function is used to handle the response when the code attempts to load the file. This function would either shortcut the code and produces and error or outputs the response - this is heavily dependent on the status code. The Fetch API returns an object that will either have a `json` or `text` method which can be called. In this case the `json` method was called as the file has a `.json` type.
- `throw new Error('Error')` and `reject('Error')` will fail a promise and trigger the code to look for the nearest `catch()` statement down the chain.
- **Orchestrating promises** is used to synchronize different promises. `Promise.all()` can be used to execute a list of promise and executing something when all promises have been resolved.
- `Promise.race()` is used to execute a promises that finishes first within a list of promises.
- `Promise.any()` is used to return a single promise that resolves within a list of promises. However, if all promises are rejected, `AggregateError` would be ouputted instead.
- Explanation on Node.js promises (4). Worth having a reread to refresh memory

### Async and Await

- Built on promises. Prepending `async` keyword to any function means functon will return a `promise`.
- Prepending `await` is the same as `.then` a promise, ensuring that the calling code executes and finishes first before moving on because the next line of code is dependent on the response or output of the previous code
- Having this layer of abstraction above promises would allow code to be more readable and isolated within functions instead.

### Node.js Event Emitter

- `EventEmitter` class can be used to handle events. `emit` used to trigger an event and `on` is used to add a calback function that will be executed when `emit` is triggered.

### HTTP Server

- `http` module was used. Server is set to listene to port `3000`, when server is read, `listen` callback function is called. Code can be found in branch `6-http-server`.
- Callback function passed will be the one that will be executed upon every request that comes in.
- Upon receiving new request, `request` event is called which then provide 2 objects - request (`http.IncomingMessage`) and response (`http.ServerResponse`) object.
- `request` provides request details (can access headers and data) while `response` is used to populate data that we will return to client
- **Get HTTP Request body data with Node.js**.

  This is with pure Node (no Express or Axios usage). Ccallback function within `createServer` is called when server gets all HTTP headers but not request body

  `request` object passed in the connection callback is called a stream. As such, we listen for body content to be processed and it is processed in chunks. First get data by listening to stream `data` events and when data ends, stream `end` is called.

  Based on code in `server.js`, we assume request data is a string. We must then concatenate chunks into a string when listening to stream `data` and when stream `end`, will parse string ot JSON. However, since Node.js v10, simplified version can be used instead with the `for await .. of`.

### File Stats

- `stat()` method provided by `fs` module can be used to get file details. `stat()` method receives file paath as an input and will then call a callback function which we pass with 2 parameters - error message and file stats.

### File Paths

- Will need to pay attention to file path. Path can differ for Linus and macOS to Windows. The following will require the `path` module
- `path.join()` can be used to join two or rmore paths
- `path.resolve()` can be used to acquire absolute path calculation
- `path.normalize()` will try to calculate actual path, when it contains relative specifiers
- Note that `resolve` nor `normalize` will check if path exists

### Reading Files

- Using `fs.readFile()` method while passing it a file path, encoding and callback function that will be called wiwth the file data (and error if it fails)
- Worth noting all three `fs.readFile()`, `fs.readFileSync()` and `fsPromises.readFile()` read fill content of the efile in memory before returning data. If files are big, there will be big impact on memory consumption and speed of execution of program. As such, better option is to read the file content using **streams**.

### Writing Files

- Using `fs.writeFile()` method to write files in Node. By default, API will replace content of file if it exists. Flags can be used to replace default ones
- If expect to have a file to be in dedicated directory already, `fs.appendFile()` can be used instead.
- All the listed methods write full content to file before returning control back to your program. As such, better option is to write file content using **streams**.

### Working with Folders

- `fs.access()` can be used to check if folder exists and if it can be accessed
- `fs.mkdri()` can be used to create a new folder
- `fs.readdir()` can be used to read contents of a directory - both files and subfolders and returns their relative path
- `fs.rename()` can be used to rename a folder
- `fs.rmdir()` can then be used to remove folders. If there are contents within folders, use `fs.rm()` instead.

### Key Note about callback and promise based modules

- Using `fs/promises` module instead of the default `fs` module can be used to avoid using callback-based API which can lead to callback hell as shown in the server.js script.

### Buffers

- It is an area of memory. Represents a fixed-size chunk of memory (can't be resizeed) allocated outside of V8 JavavScript engigne. Used to deal with binary data, in an ecosystem that traditionally only dealt with strings rather than binaries.

### Streams

- Efficient way of handling reading/writing files, network communications or any kind of end-to-end information exchange. Traditionally, when reading a file, file is read into memory from start to finish and then it is processed.
- With streams, can read it piece by piece, processing content without keeping it all in memory. Streams are instancees of `EventEmitter`
- Streams are memory efficient (do not need to load large amount of data in memory) and time efficient (takes less time to start processing data - since we do not need to wait till whole data payload is loaded and processed; which then makes it available)
- Instead of `readFile`, should use `createReadStream` instead. With that, `pipe()` method can be called on stream object which takes the source and pipes it into a destination.

### Difference between Development and Production

- Either include in shell configuration or prepending it to application initialization command eg. `NODE_ENV=production node app.js`.
- Production ensures logging is kept to minimum (essential level) and more caching level take place to optimize performance.
- Example of including conditional statements for different input commands

  ```
  if (process.env.NODE_ENV === 'development') {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  }

  if (process.env.NODE_ENV === 'production') {
    app.use(express.errorHandler());
  }
  ```

### Error Handling

- This might be a viable way (although I question how this would turn out if there were many more chains of promises) to test and find where errors are occurring within promises as shown below

  ```
  doSomething1()
    .then(() => {
      return doSomething2().catch(err => {
        // handle error
        throw err; // break the chain!
      });
    })
    .then(() => {
      return doSomething3().catch(err => {
        // handle error
        throw err; // break the chain!
      });
    })
    .catch(err => console.error(err));

  ```

### Async Flow Control

- Material originally came from (5), should read if curious. JavaScript designed to be non-blocking and if main thread is blocked; would result in browser freezing. As such to solve such problem with functional programming - callbacks are used.
- However, complex code can or may result in callback hell. As such, complex p[eratopms are made up of many functions.
- Control flow to take note of: **in series** - functions will be executed in a strict sequential order, **full parallel** - when ordering is not an issue and **limited parallel** - parallel with a limit

## Node.js and Express.js (6)

### Globals

- Global variables that can be accessed anywhere Examples are `__dirname`, `__filename`, `require` (function to use modules), `module` (info about current module) and `process` (info about environment where program is executed)

### Modules

- Every file is a module (by default). `console.log(module)` will output the following

```
Module {
  id: '.',
  path: 'C:\\Users\\ericc\\Documents\\GitHub\\node-fundamentals\\app',
  exports: {},
  parent: null,
  filename: 'C:\\Users\\ericc\\Documents\\GitHub\\node-fundamentals\\app\\2-modules.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\ericc\\Documents\\GitHub\\node-fundamentals\\app\\node_modules',
    'C:\\Users\\ericc\\Documents\\GitHub\\node-fundamentals\\node_modules',
    'C:\\Users\\ericc\\Documents\\GitHub\\node_modules',
    'C:\\Users\\ericc\\Documents\\node_modules',
    'C:\\Users\\ericc\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
```

- Having a function in another module and using `require` from another module to that particular module that invokes a function with specific code included will actually execute code as shown in commit. This can also be done with with ES6 modules. Meaning, importing a module would actually invoke it as well since importing a module actually wraps code within another function.
- Built-in modules like `os` gives information about the operating systme (can acquire information like `uptime` of computer and `userInfo` of os as well)
- `path` module (also built-in) can be used for any path related problems (folders mainly leading to a specific file perhaps like the `join` method) or even obtain absolute path for a file with the use of `__dirname` (a global variable)
- A different way of accessing a specific method from a module - `const {readFileSync} = require('fs')`.
- With `createServer` that accepts a callback with 2 arguments - `req` and `res`, `req` is a large object. Large object can also be used to obtain what address is client requesting (the endpoint specifically).
- When trying to handle multiple endpoints with multiple different `.end` on the `respond` object, ensure to include `return` statement after in the callback function to prevent code from continuing which will lead to error

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
4. Optimise Node.js Performance By Avoiding Broken Promises - https://www.nearform.com/blog/optimise-node-js-performance-avoiding-broken-promises/
5. Mixu's Node book - http://book.mixu.net/node/ch7.html
6. Node.js and Express.js - Full Course: https://www.youtube.com/watch?v=Oe421EPjeBE
