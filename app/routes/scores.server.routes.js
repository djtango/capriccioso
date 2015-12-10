var scores = require('../../app/controllers/scores.server.controller');

module.exports = function(app) {
  app.route('/scores').post(scores.create);
};
