describe('factory: MidiPlayer', function(){

  var midiPlayer;

  beforeEach(module('Capriccioso'));

  beforeEach(inject(function(MidiPlayer) {
    midiPlayer = MidiPlayer;
  }));

  beforeEach(function() {
    spyOn(playInterval, 'callNote');
  });

  it('calls the fn callNote with the right arguments when playInterval is called', function() {
    var note1 = 50;
    var intervalAbove = 6; // tritone ;)
    midiPlayer.playInterval(note1, intervalAbove);
    expect(callNote).toHaveBeenCalledWith(0, note1)
  });
});
