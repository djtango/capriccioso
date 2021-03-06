var Score = require('mongoose').model('Score');

exports.create = function(req, res, next) {
  var score = new Score({
    username: req.user.username,
    score: req.query.score
  });
  score.save(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(score);
    }
  });
};

exports.leaderboard = function(req, res) {

  var query = Score.find({})
                .select('score username')
                .sort({score: -1})
                .limit(10)
                .exec(function(err, data){
                  if(err){
                      res.json(err);
                  } else {
                      res.json(data);
                  }
                });
};
