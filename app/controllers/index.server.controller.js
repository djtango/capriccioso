exports.render = function(req, res) {
  if (req.user) {
    res.redirect('/play', {
      user: req.user.username
    });
  } else {
    res.render('index', {
      user: ''
    });
  }
};
