capri.controller('CapricciosoController', ['MidiPlayer', function(MidiPlayer) {
  var self = this;
  self.playNotes = function() {
    console.log('click');
    MidiPlayer.playInterval(50,5);
  };

  self.genNote = function() {
    return Math.floor((Math.random() * 12) + 50);
  };

  self.genInterval = function() {
    return Math.floor((Math.random() * 11) + 1);
  };

  self.setAnswer = function() {
    self.correctAnswer = MidiPlayer.intervals[self.currentInterval]
  };

  self.isAnswerCorrect = function(){
    console.log(self.enteredAnswer);
    return self.correctAnswer === self.enteredAnswer;
  };

  self.newInterval = function() {
      self.currentNote = self.genNote();
      self.currentInterval = self.genInterval();
      self.setAnswer();
  };

  self.supplyAnswer = function() {
    if(self.isAnswerCorrect()) {
      self.newInterval();
      return true;
    } else { return false; }
  };
}]);
