var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  username: String,
  score: Number
});

mongoose.model('Score', ScoreSchema);
