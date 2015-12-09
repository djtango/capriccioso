exports.render = function(req, res) {
  res.render('play', {
    user: req.user.username
  });
};
