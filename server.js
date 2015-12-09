var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config/config');
var mongoose = require('./config/mongoose');

var app = express();
var db = mongoose();
var server = http.createServer(app);

server.listen(config.port);

console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
