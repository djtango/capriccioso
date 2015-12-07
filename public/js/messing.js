window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "./js/midi/instruments/",
		instrument: "harpsichord",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
      console.log('success!');
			var delay = 0; // play one note every quarter second
			var note = 78; // the MIDI note
			var velocity = 127; // how hard the note hits
			var instrument = 6;
			// play the note
			MIDI.programChange(0, instrument);
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});
};
