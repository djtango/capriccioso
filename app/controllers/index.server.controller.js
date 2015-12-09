exports.render = function(req, res) {
    res.render('index', {
    	title: 'Capriccioso',
    	user: req.user ? req.user.username : ''
    });
};
