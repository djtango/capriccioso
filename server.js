var express = require('express');
var app = express();
var server = require('http').createServer(app).listen(8080);
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
