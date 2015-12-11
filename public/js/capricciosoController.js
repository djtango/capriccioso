capri.controller('CapricciosoController', ['MidiPlayer', 'Points', 'Timer', 'Answers', 'Notes',
 '$scope', '$interval', '$timeout', '$http', function(MidiPlayer, Points, Timer, Answers, Notes, $scope, $interval, $timeout, $http) {

  var self = this;
  var intervalsValues;
  var multipleChoice;
  var intervals;
  var C4 = 60;
  var B4 = 72;
  $scope.pointsFactory = Points;
  $scope.timerFactory = Timer;

  self.playNotes = function() {
    MidiPlayer.playInterval(self.currentNote, self.currentInterval);
    self.answerStatus = "";
    Timer.turnOn();
  };

  self.setAnswer = function() {
    self.correctAnswer = MidiPlayer.intervals[self.currentInterval];
  };

  self.isAnswerCorrect = function() {
    return self.correctAnswer === self.enteredAnswer;
  };

  self.newInterval = function() {
    self.correctButton = undefined;
    self.currentNote = Notes.genNote(C4, B4);
    self.currentInterval = Notes.genInterval(11);
    self.setAnswer();
    setAnswerOptions();
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

  self.clickAnswer = function(num) {
    if(self.respondToClicks) {
      self.clickedButton = num;
      self.enteredAnswer = self.multipleChoice[num];
      self.answerStatus = self.supplyAnswer(num) ? "Correct" : "Incorrect";
    }
  };

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
