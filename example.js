
var best = require('./');
var http = require('http');

http.createServer(function (req, res) {
  var encoding = best(req);

  res.end('best encoding: ' + encoding);
}).listen(3005);
