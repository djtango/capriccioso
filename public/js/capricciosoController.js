capri.controller('CapricciosoController', ['MidiPlayer', '$scope', function(MidiPlayer, $scope) {
  var self = this;
  var intervalsValues;
  var multipleChoice;
  var intervals;

  self.playNotes = function() {
    console.log('click');
    MidiPlayer.playInterval(self.currentNote, self.currentInterval);
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
      return true;
    } else {
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
    self.supplyAnswer();
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
      var rand0to9 = Math.floor((Math.random() * (10 - i)));
      var intervalToPush = self.intervalsValues[rand0to9];
      self.multipleChoice.push(intervalToPush);
      self.intervalsValues.splice(rand0to9,1);
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

  // self.objectValuesArray = function(object) {
  //   var array = [];
  //   for (var o in object) {
  //     array.push(object[o]);
  //   }
  //   return array;
  // };

  $scope.init = function() {
    console.log('$scope.init');
    self.newInterval();
  };
  $scope.init();
}]);
