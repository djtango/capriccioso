capri.controller('CapricciosoController', ['MidiPlayer', '$scope', function(MidiPlayer, $scope) {
  var self = this;
  self.playNotes = function() {
    console.log('click');
    MidiPlayer.playInterval(self.currentNote,self.currentInterval);
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
    console.log('newInterval')
    self.currentNote = self.genNote();
    self.currentInterval = self.genInterval();
    self.setAnswer();
    self.randomAnswers();
    console.log('NI-curNote:' + self.currentNote);
    console.log('NI-curIn:' + self.currentInterval);
    console.log('NI-corAns:' + self.correctAnswer);
  };

  self.supplyAnswer = function() {
    if(self.isAnswerCorrect()) {
      self.newInterval();
      return true;
    } else { return false; }
  };

  self.randomAnswers = function() {
    var intervals = MidiPlayer.intervals;
    return {
      "answer1": intervals[self.currentInterval],
      "answer2": intervals[(self.currentInterval + 1)],
      "answer3": intervals[(self.currentInterval + 2)],
      "answer4": intervals[(self.currentInterval + 3)]
    };
  };

  self.clickAnswer = function(num) {
    var playerAnswer = "answer" + num
    self.enteredAnswer = self.randomAnswers()[playerAnswer];
    self.supplyAnswer();
  };


  $scope.init = (function() {
    console.log('$scope.init')
    self.newInterval();
  })();
  // $scope.init();
}]);
