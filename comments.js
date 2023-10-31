// Create web server that can respond to a GET request to /comments with an array of comments, 
// regardless of the HTTP method. Use the fs module to read the comments.json file and send its parsed 
// content back to the client. Use the code from the readJSON function in the previous exercise to parse the 
// file content. Use the code from the writeJSON function to send the response.
// If you’re having trouble, try solving the previous exercise first.

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
const commentsPath = path.join(__dirname, 'comments.json');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/comments') {
    readJSON(commentsPath, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end(err.message);
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

function readJSON(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
    } else {
      try {
        const parsedData = JSON.parse(data);
        callback(null, parsedData);
      } catch (err) {
        callback(err);
      }
    }
  });
}

