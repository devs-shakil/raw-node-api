const path = require('path');
const os = require('node:os');

// const fileName = path.basename('/Users/admin/Desktop/Projects/raw-node-api/app.js');
// console.log(fileName);
// const fileNameWithoutExit = path.basename('/Users/admin/Desktop/Projects/raw-node-api/app.js', '.js');
// console.log(fileNameWithoutExit);
// const dirName = path.dirname('/Users/admin/Desktop/Projects/raw-node-api/app.js');
// console.log(dirName);
// const fileExt = path.extname('/Users/admin/Desktop/Projects/raw-node-api/app.js');
// console.log(fileExt);
// const configPath = path.join('/Users/admin/Desktop/Projects/raw-node-api', 'config.json');
// console.log(configPath);

// ES Module (e.g., app.mjs or "type": "module" in package.json)

// Get the current module's URL
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// console.log('ES Module file path:', __filename);
// console.log('ES Module directory:', __dirname);

// Example with dynamic imports
// async function loadConfig() {
//   const configPath = new URL('../config/app-config.json', import.meta.url);
//   const config = await import(configPath, { with: { type: 'json' } });
//   return config;
// }
// const config = await loadConfig();
// console.log('Config:', config);


// Os Module 
// console.log('Operating System Info:');
// console.log('Platform:', os.platform());
// console.log('CPU Architecture:', os.arch());
// console.log("os.EOL",os.availableParallelism());
// // console.log("os.constants",os.constants);
// // console.log('os.cpus()', os.cpus());
// console.log("os.freemem()",os.freemem());
// console.log("os.hostname()",os.hostname());
// // console.log("os.networkInterfaces()",os.networkInterfaces());
// console.log("os.release()",os.release());
// console.log("os.version()",os.version());


// cluster module 
const cluster = require('cluster');
// const os = require('os');

// Check if this is the master process
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // This is the master process

  console.log(`Master ${process.pid} is running`);
    console.log(`Number of CPU cores: ${numCPUs}`);
  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // You can fork a new worker to replace the dead one
    console.log('Forking a new worker...');
    cluster.fork();
  });
} else {
  // This is a worker process

  // Create an HTTP server
  const hello = http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`Hello from Worker ${process.pid}\n`);

    // Simulate CPU work
    let i = 1e7;
    while (i > 0) { i--; }

  }).listen(8000);
  console.log('Server running at http://localhost:8000/',hello);
  
  console.log(`Worker ${process.pid} started`);
}