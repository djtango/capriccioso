describe('factory: MidiPlayer', function(){

  var midiPlayer;
  var midi;

  beforeEach(module('Capriccioso'));

  beforeEach(inject(function(MidiPlayer) {
    midiPlayer = MidiPlayer;
  }));

  beforeEach(function() {
    midi = {
      programChange: function(channel, instrument) {},
      setVolume: function(channel, velocity) {},
      noteOn: function(channel, note, velocity, noteStart) {},
      noteOff: function(channel, note, noteEnd) {}
    };
  });

  beforeEach(function() {
    spyOn(MIDI, 'loadPlugin');
    spyOn(midi, 'programChange');
    spyOn(midi, 'setVolume');
    spyOn(midi, 'noteOn');
    spyOn(midi, 'noteOff');
  });

  it('calls the fn callNote with the right arguments when playInterval is called', function() {
    var note = 50;
    var intervalAbove = 6; // tritone ;)
    midiPlayer.playInterval(note, intervalAbove);
    expect(MIDI.loadPlugin).toHaveBeenCalled();
  });

  it('calls the required methods when callNote is called', function() {
    var channel = 0;
    var note = 50;
    var velocity = 127; // how hard the note hits
    var instrument = 0;
    var noteStart = 0;
    var noteEnd = 1.5;
    midiPlayer.callNote(channel, note, midi);
    expect(midi.programChange).toHaveBeenCalledWith(channel, instrument);
    expect(midi.setVolume).toHaveBeenCalledWith(channel, velocity);
    expect(midi.noteOn).toHaveBeenCalledWith(channel, note, velocity, noteStart);
    expect(midi.noteOff).toHaveBeenCalledWith(channel, note, noteEnd);
  });
});
