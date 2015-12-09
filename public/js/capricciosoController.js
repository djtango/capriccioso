capri.controller('CapricciosoController', ['MidiPlayer', 'Points', 'Timer',
 '$scope', '$interval', function(MidiPlayer, Points, Timer, $scope, $interval) {

  var self = this;
  var intervalsValues;
  var multipleChoice;
  var intervals;
  $scope.pointsFactory = Points;
  $scope.timerFactory = Timer;

  self.playNotes = function() {
    console.log('click');
    MidiPlayer.playInterval(self.currentNote, self.currentInterval);
    self.answerStatus = "";
    Timer.turnOn();
    console.log('Timer:' + Timer.timeLeft);
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
    console.log(self.enteredAnswer);
    return self.correctAnswer === self.enteredAnswer;
  };

  self.newInterval = function() {
    console.log('newInterval');
    self.currentNote = self.genNote();
    self.currentInterval = self.genInterval();
    self.setAnswer();
    self.intervalsValues = self.copyArray(MidiPlayer.intervalNamesArray);
    self.populateAnswers();
    self.randomAnswers();
    console.log('NI-curNote:' + self.currentNote);
    console.log('NI-curIn:' + self.currentInterval);
    console.log('NI-corAns:' + self.correctAnswer);
  };

  self.supplyAnswer = function() {
    if (self.isAnswerCorrect()) {
      self.newInterval();
      Points.changePoints(+1);
      console.log('Correct! Points:' + Points.pointsTotal);
      return true;
    } else {
      Points.changePoints(-1);
      console.log('Wrong!, Points:' + Points.pointsTotal);
      return false;
    }
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
    var playerAnswer = "answer" + num;
    self.enteredAnswer = self.randomAnswers()[playerAnswer];
    self.answerStatus = self.supplyAnswer() ? "Correct" : "Incorrect";
  };

  self.populateAnswers = function() {
    self.intervals = MidiPlayer.intervals;
    self.multipleChoice = [];
    self.populateMultipleChoice();
    console.log("self.multipleChoice:"+self.multipleChoice);
  };

  self.populateMultipleChoice = function() {
    var indexToDelete = self.intervalsValues.indexOf(self.intervals[self.currentInterval]);
    console.log('indexToDelete:' + indexToDelete);
    self.intervalsValues.splice(indexToDelete, 1);
    console.log('self.intervalsValues:' + self.intervalsValues);
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

//runs when you start the app in browser
  $scope.init = function() {
    console.log('$scope.init');
    self.newInterval();
  };
  $scope.init();
}]);
