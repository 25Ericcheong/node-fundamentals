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

### NPM Commands

- `npm i <packageName>` installs local dependency for project. For global dependency installation - `npm install -g <packageName>` would be used instead. To prepare project for Node project - `npm init -y` will create all required files for Node project
- With `nodemon` package installed, could just `nodemon filename` on CLI and nodemon will continue to observe file changes. If files changes are saved, nodemon will restart server and changes made can be seen then
- Command `nodemon filename` can be shortcut within the `package` file within the `scripts` object as a key which will be used as a keyword to run with the use of NPM
- Note that `npm keyInScriptsObj` will be used to run the command included within the `scripts` object of the package file. There may be time when `npm keyInScriptsObj` would work but there are times where `npm run keyInScriptsObj` will need to be used instead - just try both

### Node.js Event Loop (important for Express)

- Intention of this concept is to offload time consuming operations. To ensure code is non blocking, the event loop would registers the callback first (while ensuring all immediate code is executed first). Event loop ensures all requests' operations are executed first (successfully) and would then only begin executing callback functions.

### Async Patterns

- If there is a `sync` code written and will take time to finish executing, code will be blocked. Even though code is blocked for a separate url path and user is trying to navigate to a different url - user trying to access a different path will neeed to wait for blocking code to finish before having the resources to load their selected url (blocking code)
- `await` gets rid of the problem of callback function. Withou `await`, will need to have multiple `.then` method being called for when there are multiple promises involved
- `async` gets rid of the problem of writing complex promises if multiple asynchronous functions rely on one and another; with multiple callback functions without a promise of another for say when we want to read and write multiple files
- `util` package can also be used to write and read files as well by creating promises on the get go and not relying on callbacks within promises created

### Events

- Calling `require('events')` would be calling a class. Will need to create an instance of this class which would allow us to call its method. The two methods woul be the `on` (to listen for an event) and `emit` (to emit an event)
- It is possible to have the same `on` method listen to the same event name or key and have different logics within both of them. This could help with better isolating code separately for better readability
- On top of the event name or key that will be used to call/initiate the event. Additional arguments can be added to the function too which can then be called with parameters that can be named as required within the callback function of the listening method - `on`
- Http module utilizes the `Event` concept which means that it also has the `on` method built with it when a server is created with the `createServer` method. With this, it can also listne to specific event names. All applicable event names can be found in the documentation and are as such `Event: applicableEventName`. The class will extend the `EventEmitter` which explains why it has the `on` method.

### Streams

- Streams used to write or read sequentially. Useful when it comes to reading and writing big files. Types includes writeable, readable, duplex (used to read or write data sequentially) and transform (modify data read).
- Streams extends `EventEmitter` class and many modules utilizes streams module as well.
- Amount of data read from a very large file can sometimes be too large to assign to a single variable. This can be fixed with the streams option.
- Data read from a file is read in chunks - by default; the size of the chunks are 64 kB. This can be seen in the `createReadStream` method which creates an instance of `fs.ReadStream` and the instance extends `stream.Readable` which indicates why and where the `data` event has originated from.
- Note that the default chunk size can be changed with the use of `highWaterMark`. Setting the encoding to `utf8` would then allow us to read/see the content of the files. The `error` event key can then be used to capture error and prevents the app from failling.

### Streams - Http Eg.

- This example can be seen in branch No. 19. With the `readFileSync`, the entire data read from the file is sent to the frontend in 1 request.
- `pipe` method can be found from the `ReadStream` class which can read then write data in chunks; essentially piping data into a writeable stream

### HTTP Stuff

- Response/Request cycle: URL inputted sends a request to server that is responsible for serving those resources and server then sends back responds. It is not HTTP protocol but its a HTTP messages (this is how data is cycles within the Web)
- Response/Request structure: Both have start line (will have a method, URL and HTTP version), optional headers, a blank line that indicates all the meta info that has been sent and optional body. Request message's method is GET by default.
- Headers includes meta information about the request. Inspecting network tab will enablee you to look at the requests received from the server
- When using HTTP module, can also write the headers of the responds that will be sent to the client (can include content type for a specific status code etc.)
- Every single `href` or `src` paths would mean that the server would need to provide the resources to serve the requests (external requests made to external links would mean that external resources would be involved instead of internal ones). These links can be found in a HTML file and would then invoke the server's internal resources to provide to the client's request. As such, the paths would need to be included in the server's code in order for the server to provide resources to serve the links included in the HTML file.

### Express

- It is built on top of Node; more specifically HTTP module. More information about this can be found here (8). A framework that skips the repetitive boilerplate code that is needed when creating multiple endpoints (can clearly be seen when writing purely with Node's Http module)
- `.all` method is used for when user attempts to access an endpoint that does not exist. Ensuring that the respond has the `404` status code attached to it as well makes sense as the default `200` status code for an error message does not make sense
- `.static` method is a built in middleware of express. Static asset means it is a file that does not need to be changed by server. Examples are styles, image and javascript files. This will get rid of the need to setting up different file paths for each of these files which is not needed and will be handled by express.

### Express: API vs SSR

- API or templates that are prepared on server's side. In Express, API means that we are setting up a HTTP interface to interact with data which is sent in the form of JSON which is done by `res.json()`.
- The server side rendering would mean that templating will be done. Meaning, templates will be prepared which will include files like html, css and javascript files that will be sent from the backend to the client and that is done with the `res.render()` method.
- An example of how an API can be structured (9) so that it can easily be used by other developers if the plan is to develop a public API for others to use.

### Express: Route Params / Query String

- Can be used to get complete / all information about a single item provided that the parameter sent from the client is a unique id can be used extract the item's information. This is done by attaching an expected parameter onto the URL which the server will then use to extract all relevant information.
- Route parameter can be complex and can accept multiple paramters which the server can then utilize to acquire relevant; more specific information to be used by the client and sent as a responds.
- Query string is a way to send small amount of information to the backend for usage from the client. A query string begins after the `?` in the URL which will then be used by the backend to extract additional filtered information from the database. The query string consist of key value pairs which will be accessed in the backend and used to extract filtered information.
- An example when preparing for backend to receive a query string from the client - the code will need to be done as such;

```
app.get('/api/v1/query', (req,res) => {
  console.log(req.query)
  res.send('Hello')
})
```

- Assuming that `app` has been invoked with the `express()` method. In this case, an example of a query string can be (inputted into the URL) `domain/api/v1/query?name=eric&id=4`. The query string or object that the backend would receive would be a dictionary object with the keys being name and id while the values being eric and 4 respectively.
- Note, ensure that a `return` is used when returning a responds to the client. This prevents a large error log from appearing as Express expects only 1 respond to occur.

### Express: Middleware

- Express middleware are functions that executes during the request to the server. Each middleware have access to request and respond objects. It is everywhere in Express (heart and soul of it). Middleware seats between request and respond.

```
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const time = new Date().getFullYear()
  console.log(method, url, time)
}

app.get('/', logger, (req, res) => {
  res.send('Home')
})
```

- Above is an example of passing a middleware function into a specific route. The parameters specified in the logger function are automatically done by Express in the background. Note that - `next` needs to be used in order for the middleware function to know what the next middleware is (to pass on). Or simply executing `res.send('Something')` would do the trick as well. As such, if `next()` isn't invoked, the tab would continuously be loading - waiting for the next middleware function to execute.
- Middleware functions should have its own dedicated file to prevent dedicated route; `app.use` functions from being too clunky.

# Useful Node Modules

## lodash

- Could possibly look into using this utility package to help with processing certain data type to be in a certain structure or form

## nodemon

- Can be used to restart application automatically when a change is made to file. Instructions can be found here: https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line

## inquirer

- Can be used to inquire input from user and provide all types of inputs for user interact with. https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs

## Modules for Global System Usage Across Projects

- `npm`, `vue-cli`, `grunt-cli`, `mocha`, `react-native-cli`, `gatsby-cli`, `forever` and `nodemon`

# Additional JavaScript information

## JavaScript is a compiled language

- JavaScript used to be an interpreted language (line by line execution) but is now a compiled language (2)

## Basics of Package.json

- More information or basics about `Package.json`. May help with understanding specific aspects of writing a good `Package.json` or debugging (7)

## Topics covered prior to using Express.js framework

- Event loop, async patterns, events emitter and streams (may need to look into it for better understanding)

References:

1. How Node.js Works | Mosh: https://www.youtube.com/watch?v=jOupHNvDIq8
2. JavaScript - is it Compiled or Interpreted?: https://almogad.medium.com/javascript-is-it-compiled-or-interpreted-9779278468fc
3. Node.js Everywhere with Environment Variables: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
4. Optimise Node.js Performance By Avoiding Broken Promises - https://www.nearform.com/blog/optimise-node-js-performance-avoiding-broken-promises/
5. Mixu's Node book - http://book.mixu.net/node/ch7.html
6. Node.js and Express.js - Full Course: https://www.youtube.com/watch?v=Oe421EPjeBE
7. The Basics of Package.json in Node.js and npm - NodeSource - http://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/
8. Express - https://expressjs.com/
9. Algolia Hacker Search API - https://hn.algolia.com/api
