// Create web server
// 1. Load the http module
const http = require('http');
const fs = require('fs');
const url = require('url');
const comments = require('./comments.js');

// 2. Create an HTTP server to handle responses
http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  } else if (pathname === '/comment') {
    var comment = urlObj.query;
    comments.push(comment);
    res.end();
  } else if (pathname === '/getComments') {
    var data = JSON.stringify(comments);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(data);
    res.end();
  } else {
    fs.readFile('.' + pathname, function (err, data) {
      if (err) {
        console.log(err);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
}).listen(3000, function () {
  console.log('Server is running at port 3000');
});
// 3. Listen on port 3000
// 4. Output a message to the console
// 5. When a request is received:
//    - Read the file index.html
//    - Write the contents of the file to the response
//    - Send the response
// 6. Listen on port 3000
// 7. Output a message to the console
// 8. When a request is received:
//    - Read the file index.html
//    - Write the contents of the file to the response
//    - Send the response
// 9. When a request is received:
//    - Get the comments from comments.js