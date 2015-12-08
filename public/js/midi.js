var playNotes = function (note1,note2) {
	MIDI.loadPlugin({
		soundfontUrl: "./js/midi/instruments/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
      console.log('success!');
			var delay = 0; // play one note every quarter second
			// var note = 55; // the MIDI note
			// var note2 = 30;
			var velocity = 127; // how hard the note hits
			var instrument = 0;
			// play the note
			MIDI.programChange(0, instrument);
			MIDI.programChange(1, instrument);
			MIDI.setVolume(0, 127);
			MIDI.setVolume(1, 127);
			MIDI.noteOn(0, note1, velocity, delay);
			MIDI.noteOn(1, note2, velocity, delay);
			MIDI.noteOff(0, note1, delay + 1.5);
			MIDI.noteOff(1, note2, delay + 1.5);

		}
	});
};

var playInterval = function (note1,intervalAbove) {
	MIDI.loadPlugin({
		soundfontUrl: "./js/midi/instruments/",
		instrument: "acoustic_grand_piano",
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var note2 = note1 + intervalAbove;
			var velocity = 127; // how hard the note hits
			var instrument = 0;
			// play the note
			MIDI.programChange(0, instrument);
			MIDI.programChange(1, instrument);
			MIDI.setVolume(0, 127);
			MIDI.setVolume(1, 127);
			MIDI.noteOn(0, note1, velocity, delay);
			MIDI.noteOn(1, note2, velocity, delay);
			MIDI.noteOff(0, note1, delay + 1.5);
			MIDI.noteOff(1, note2, delay + 1.5);

		}
	});
};

var intervals = {
	'Minor 2nd': 1,
	'Major 2nd': 2,
	'Minor 3rd': 3,
	'Major 3rd': 4,
	'Perfect 4th': 5,
	'Augmented 4th': 6,
	'Perfect 5th': 7,
	'Minor 6th': 8,
	'Major 6th': 9,
	'Minor 7th': 10,
	'Major 7th': 11
};
