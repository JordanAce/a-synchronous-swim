const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue.js')

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

// let messageQueue = null;
// module.exports.initialize = (queue) => {
//   messageQueue = queue;
// };

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS' && req.url === '/') {
    res.writeHead(200, headers);
    res.end();
    next();
  }

  if (req.method === 'GET' && req.url === '/') {
    let command = messageQueue.dequeue();
    if(command) {
      res.writeHead(200, headers);
      res.end(command);
      next();
    } else {
      res.writeHead(200, headers);
      res.end(generateRandomCommand());
      next();
    }
  }

  if (req.method === 'GET' && req.url === '/background.jpg') {
    console.log('WE ARE GETTING IN');
    fs.readFile(module.exports.backgroundImageFile, (err, data) => {
      if (err) {
        res.writeHead(404, headers);
        res.end();
        next();
      } else {
        res.writeHead(200, headers);
        res.end(data);
        next();
      }
    });

  }
 // invoke next() at the end of a request to help with testing!
};

// helper function
const generateRandomCommand = function() {
  let commands = ['up', 'down', 'left', 'right'];
  return commands[Math.floor(Math.random() * commands.length)];
};