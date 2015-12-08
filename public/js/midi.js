var playNotes = (function () {
  MIDI.loadPlugin({
    soundfontUrl: "./js/midi/instruments/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
      console.log(state, progress);
    },
    onsuccess: function() {
      console.log('success!');
      var delay = 0; // play one note every quarter second
      var note = 78; // the MIDI note
      var note2 = 50;
      var velocity = 127; // how hard the note hits
      var instrument = 0;
      // play the note
      MIDI.programChange(0, instrument);
      MIDI.setVolume(0, 127);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 1.5);
      MIDI.programChange(1, instrument);
      MIDI.setVolume(1, 127);
      MIDI.noteOn(1, note2, velocity, delay);
      MIDI.noteOff(1, note2, delay + 1.5);

    }
  });
});
window.onload = function () {
  MIDI.loadPlugin({
    soundfontUrl: "./js/midi/instruments/",
    instrument: "acoustic_grand_piano",
    onprogress: function(state, progress) {
      console.log(state, progress);
    },
    onsuccess: function() {
      console.log('success!');
      var delay = 0; // play one note every quarter second
      var note = 78; // the MIDI note
      var note2 = 50;
      var velocity = 127; // how hard the note hits
      var instrument = 0;
      // play the note
      MIDI.programChange(0, instrument);
      MIDI.setVolume(0, 127);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 1.5);
      MIDI.programChange(1, instrument);
      MIDI.setVolume(1, 127);
      MIDI.noteOn(1, note2, velocity, delay);
      MIDI.noteOff(1, note2, delay + 1.5);

    }
  });
};
