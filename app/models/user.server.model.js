var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  email: String,
  username: {
    type: String,
    trim: true,
    unique: true
  },
  password: String,
  provider: String,
  providerId: String,
  providerData: {}
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    var md5 = crypto.createHash('md5');
    this.password = md5.update(this.password).digest('hex');
  }
  next();
});

UserSchema.methods.authenticate = function(password) {
  var md5 = crypto.createHash('md5');
  md5 = md5.update(password).digest('hex');

  return this.password === md5;
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
  var self = this;
  var possibleUsername = username + (suffix || '');

  self.findOne(
    {username: possibleUsername},
    function(err, user) {
      if (!err) {
        if (!user) {
          callback(possibleUsername);
        }
        else {
          return self.findUniqueUsername(username, (suffix || 0) + 1, callback);
        }
      }
      else {
        callback(null);
      }
    }
  );
};

mongoose.model('User', UserSchema);
