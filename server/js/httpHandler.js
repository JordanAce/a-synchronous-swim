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

  if (req.method === 'POST') {
    var jsonString = '';
    req.on('data', (data) => {
      jsonString+=data;
    });
    console.log(jsonString);
      req.on('end', function () {
        fs.writeFile(module.exports.backgroundImageFile, JSON.parse(jsonString), (err) => {
          if (err) {
            res.writeHead(404, headers);
            res.end();
            next();
          }
          console.log('Background Replaced');
          res.writeHead(201, headers);
          res.end();
          next();
        });
      })
    };

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

};

// helper function
const generateRandomCommand = function() {
  let commands = ['up', 'down', 'left', 'right'];
  return commands[Math.floor(Math.random() * commands.length)];
};