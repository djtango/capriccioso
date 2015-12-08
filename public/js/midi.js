var instrument;

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
			callNote(0,note1,velocity,instrument);
			callNote(1,note2,velocity,instrument);
		}
	});
};

function callNote(channel,note,velocity,instrument){
	MIDI.programChange(channel, instrument);
	MIDI.setVolume(channel,velocity);
	MIDI.noteOn(channel,note,velocity,0);
	MIDI.noteOff(channel,note,1.5);
}

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
