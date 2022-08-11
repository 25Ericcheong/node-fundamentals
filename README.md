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

### Accepting Arguments

- Arguments an be a value or a key and a value. Can be retrieved using `process` object built into Node.js which expose an `argv` property that contains all command line invocation arguments. First is the full path of `node` command, second is full path of file being executed and all additional arguments are present from third position going forward.

### Output to Command Line

- With `console` module, can use `console.count()` to check number of time a variable has been checked. `console.count()` can also be used with a loop and if only a variable is passed into it, it logs the number of time this variable (or value) has been found or checked.

# Useful Node Modules

## nodemon

- Can be used to restart application automatically when a change is made to file. Instructions can be found here: https://nodejs.dev/learn/run-nodejs-scripts-from-the-command-line

# Additional JavaScript information

## JavaScript is a compiled language

- JavaScript used to be an interpreted language (line by line execution) but is now a compiled language (2)

References:

1. How Node.js Works | Mosh: https://www.youtube.com/watch?v=jOupHNvDIq8
2. JavaScript - is it Compiled or Interpreted?: https://almogad.medium.com/javascript-is-it-compiled-or-interpreted-9779278468fc
3. Node.js Everywhere with Environment Variables: https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
