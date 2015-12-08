capri.controller('CapricciosoController', [function() {
  var self = this;
  self.playNotes = function() {
    console.log('click');
    playInterval(50,5);
  };
  self.answer = "Second"
  self.isAnswerCorrect = function(){
    console.log(self.enteredString);
    return self.answer === self.enteredString;
  };
}]);
