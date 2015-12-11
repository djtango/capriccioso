capri.controller('CapricciosoController', ['MidiPlayer', 'Points', 'Timer', 'Answers',
 '$scope', '$interval', '$timeout', '$http', function(MidiPlayer, Points, Timer, Answers, $scope, $interval, $timeout, $http) {

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

  // generate note configurations

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
    self.correctButton = undefined;
    self.currentNote = self.genNote();
    self.currentInterval = self.genInterval();
    self.setAnswer();
    // self.intervalsValues = self.copyArray(MidiPlayer.intervalNamesArray);
    setAnswerOptions();
    // self.bindMultipleChoiceAnswers();
    self.respondToClicks = true;
  };

  self.supplyAnswer = function(num) {
    if (self.isAnswerCorrect()) {
      self.correctButton = self.clickedButton;
      self.respondToClicks = false;
      $timeout(self.resetButtons, 300);
      return true;
    } else {
      self.incorrectButton = self.clickedButton;
      Points.changePoints(-1);
      return false;
    }
  };

  self.resetButtons = function() {
    self.correctButton = undefined;
    self.incorrectButton = undefined;
    self.newInterval();
    Points.changePoints(+1);
    self.playNotes();
    console.log("Timeout finished!");
  };

  self.isButtonCorrect = function(buttonNumber) {
    return buttonNumber === self.correctButton;
  };

  self.isButtonIncorrect = function(buttonNumber) {
    return buttonNumber === self.incorrectButton;
  };

  function setAnswerOptions() {
    self.multipleChoice = Answers.populateMultipleChoice(MidiPlayer.intervalNamesArray,
                                                         self.currentInterval)
  };

  // self.bindMultipleChoiceAnswers = function() {
  //   return {
  //     "answer1": self.multipleChoice[0],
  //     "answer2": self.multipleChoice[1],
  //     "answer3": self.multipleChoice[2],
  //     "answer4": self.multipleChoice[3],
  //   };
  // };

  self.clickAnswer = function(num) {
    if(self.respondToClicks) {
      // var playerAnswer = "answer" + num;
      self.clickedButton = num;
      console.log(self.multipleChoice);
      self.enteredAnswer = self.multipleChoice[num];
      self.answerStatus = self.supplyAnswer(num) ? "Correct" : "Incorrect";
    }
  };

  // self.populateAnswers = function() {
    // self.intervals = MidiPlayer.intervals;
  //   self.multipleChoice = [];
  //   self.populateMultipleChoice();
  // };

  // self.populateMultipleChoice = function() {
  //   var indexToDelete = self.intervalsValues.indexOf(self.intervals[self.currentInterval]);
  //   self.intervalsValues.splice(indexToDelete, 1);
  //   self.multipleChoice.push(self.correctAnswer);
  //
  //   for (i = 0; i < 3; i++) {
  //     var rand = Math.floor((Math.random() * (10 - i)));
  //     var intervalToPush = self.intervalsValues[rand];
  //     self.multipleChoice.push(intervalToPush);
  //     self.intervalsValues.splice(rand,1);
  //   }
  //   self.shuffleArray(self.multipleChoice);
  // };

  // self.shuffleArray = function(array) {
  //   var i = 0,
  //     j = 0,
  //     temp = null;
  //
  //   for (i = array.length - 1; i > 0; i -= 1) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  // };
  //
  // self.copyArray = function(array) {
  //   return array.map(function(element) {
  //     return element;
  //   });
  // };

  self.storeScore = function() {
    $http({
      url: '/scores',
      method: 'POST',
      params: {
        'score': Points.pointsTotal,
      }
    });

    $http({
      url: '/leaderboard',
      method: 'GET'
    }).then(function(res){
      self.leaderboardJSON = res.data;
      console.log(self.leaderboardJSON);
      self.showLeaderboard = true;
    });
  };

  $interval(function(){ Timer.countdown(); }, 1000);

  $scope.init = (function() {
    self.showLeaderboard = false;
    self.newInterval();
  })();
}]);
