var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {
	app.route('/users').post(users.create).get(users.list);

	app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

	app.param('userId', users.userByID);

	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);

	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/play',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.get('/logout', users.logout);

	app.route('/scores').post(users.storeScore);
};
