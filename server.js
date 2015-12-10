process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config');
var	mongoose = require('./config/mongoose');
var	express = require('./config/express');
var	passport = require('./config/passport');

var db = mongoose();
var app = express();
var	passport = passport();

app.listen(config.port);
app.get("/leaderboard", function(req, res) {
  res.sendFile(__dirname+"/app/views/leaderboard.ejs");
});

module.exports = app;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
