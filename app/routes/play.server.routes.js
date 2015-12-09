module.exports = function(app) {
  var play = require('../controllers/play.server.controller');
  app.get('/play', play.render);
};
