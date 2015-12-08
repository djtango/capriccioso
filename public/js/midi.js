capri.factory('MidiPlayer', function(){
  return {
    playInterval: function (note1, intervalAbove) {
      var self = this;
      MIDI.loadPlugin({
        soundfontUrl: "./js/midi/instruments/",
        instrument: "acoustic_grand_piano",
        onsuccess: function() {
          console.log('success');
          var delay = 0; // play one note every quarter second
          var note2 = note1 + intervalAbove;
          var velocity = 127; // how hard the note hits
          // var instrument = 0;
          // play the note
          self.callNote(0, note1, velocity, 0);
          self.callNote(1, note2, velocity, 0);
        }
      })
    },

    callNote: function (channel,note,velocity,instrument){
      console.log('callNote')
      MIDI.programChange(channel, instrument);
      MIDI.setVolume(channel,velocity);
      MIDI.noteOn(channel,note,velocity,0);
      MIDI.noteOff(channel,note,1.5);
    },

    intervals: {
      1: 'Minor 2nd',
      2: 'Major 2nd',
      3: 'Minor 3rd',
      4: 'Major 3rd',
      5: 'Perfect 4th',
      6: 'Augmented 4th',
      7: 'Perfect 5th',
      8: 'Minor 6th',
      9: 'Major 6th',
      10: 'Minor 7th',
      11: 'Major 7th'
    }
  }
});
