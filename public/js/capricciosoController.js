capri.controller('CapricciosoController', ['MidiPlayer', function(MidiPlayer) {
  var self = this;
  self.playNotes = function() {
    console.log('click');
    MidiPlayer.playInterval(50,5);
  };
  self.answer = "Second"
  self.isAnswerCorrect = function(){
    console.log(self.enteredString);
    return self.answer === self.enteredString;
  };
}]);
