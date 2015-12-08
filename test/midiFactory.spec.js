describe('factory: MidiPlayer', function(){

  var midiPlayer;

  beforeEach(module('Capriccioso'));

  beforeEach(inject(function(MidiPlayer) {
    midiPlayer = MidiPlayer;
  }));

  beforeEach(function() {
    spyOn(playInterval, 'callNote')
    // callNoteFake = jasmine.createSpyObj('callNoteFake')
  });
});
