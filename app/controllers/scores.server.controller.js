var Score = require('mongoose').model('Score');

exports.create = function(req, res, next) {
  var score = new Score(req.body);
  score.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(score);
    }
  });
};
