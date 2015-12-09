capri.controller('CapricciosoController', ['MidiPlayer', 'Points', 'Timer',
 '$scope', '$interval', '$timeout', function(MidiPlayer, Points, Timer, $scope, $interval, $timeout) {

  var self = this;
  var intervalsValues;
  var multipleChoice;
  var intervals;
  $scope.pointsFactory = Points;
  $scope.timerFactory = Timer;

  self.playNotes = function() {
    MidiPlayer.playInterval(self.currentNote, self.currentInterval);
    self.answerStatus = "";
    Timer.turnOn();
  };

  self.genNote = function() {
    return Math.floor((Math.random() * 12) + 50);
  };

  self.genInterval = function() {
    return Math.floor((Math.random() * 11) + 1);
  };

  self.setAnswer = function() {
    self.correctAnswer = MidiPlayer.intervals[self.currentInterval];
  };

  self.isAnswerCorrect = function() {
    return self.correctAnswer === self.enteredAnswer;
  };

  self.newInterval = function() {
    self.correctButton = 0;
    self.currentNote = self.genNote();
    self.currentInterval = self.genInterval();
    self.setAnswer();
    self.intervalsValues = self.copyArray(MidiPlayer.intervalNamesArray);
    self.populateAnswers();
    self.randomAnswers();
    self.respondToClicks = true;
  };

  self.supplyAnswer = function() {
    if (self.isAnswerCorrect()) {
      self.correctButton = self.clickedButton;
      self.respondToClicks = false;
      console.log("Timeout called!");
      $timeout(self.resetButtons, 5000);
      return true;
    } else {
      self.incorrectButton = self.clickedButton;
      Points.changePoints(-1);
      return false;
    }
  };

  self.resetButtons = function() {
    self.correctButton = 0;
    self.incorrectButton = 0;
    self.newInterval();
    Points.changePoints(+1);
    console.log("Timeout finished!");
  };

  self.isButtonCorrect = function(buttonNumber) {
    return buttonNumber === self.correctButton;
  };

  self.isButtonIncorrect = function(buttonNumber) {
    return buttonNumber === self.incorrectButton;
  };

  self.randomAnswers = function() {
    return {
      "answer1": self.multipleChoice[0],
      "answer2": self.multipleChoice[1],
      "answer3": self.multipleChoice[2],
      "answer4": self.multipleChoice[3],
    };
  };

  self.clickAnswer = function(num) {
    if (self.respondToClicks) {
      var playerAnswer = "answer" + num;
      self.clickedButton = num;
      self.enteredAnswer = self.randomAnswers()[playerAnswer];
      self.answerStatus = self.supplyAnswer() ? "Correct" : "Incorrect";
    }
  };

  self.populateAnswers = function() {
    self.intervals = MidiPlayer.intervals;
    self.multipleChoice = [];
    self.populateMultipleChoice();
  };

  self.populateMultipleChoice = function() {
    var indexToDelete = self.intervalsValues.indexOf(self.intervals[self.currentInterval]);
    self.intervalsValues.splice(indexToDelete, 1);
    self.multipleChoice.push(self.correctAnswer);

    for (i = 0; i < 3; i++) {
      var rand = Math.floor((Math.random() * (10 - i)));
      var intervalToPush = self.intervalsValues[rand];
      self.multipleChoice.push(intervalToPush);
      self.intervalsValues.splice(rand,1);
    }
    self.shuffleArray(self.multipleChoice);
  };

  self.shuffleArray = function(array) {
    var i = 0,
      j = 0,
      temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  self.copyArray = function(array) {
    return array.map(function(element) {
      return element;
    });
  };


  $interval(function(){ Timer.countdown(); }, 1000);

  $scope.init = (function() {
    self.newInterval();
  })();
}]);
