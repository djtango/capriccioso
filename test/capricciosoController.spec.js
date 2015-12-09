describe('CapricciosoController', function() {
  beforeEach(module('Capriccioso'));

  var ctrl;
  var middleC = 50;
  var perfect4th = 5;
  var mockMidiPlayer;
  var scope;
  var midiPlayerSpy = jasmine.createSpyObj('midiPlayerSpy', ['playInterval', 'intervals'])

  beforeEach(inject(function($rootScope, $controller, $q){ 

    scope = $rootScope.$new();

    mockMidiPlayer = {
      playInterval: function(note, interval) {},
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
    };

    ctrl = $controller('CapricciosoController', {
      $scope: scope,
      MidiPlayer: midiPlayerSpy
    });
    ctrl.genNote = function() { return middleC; };
    ctrl.genInterval = function() { return perfect4th; };

  }));


  it('will return a random home note using genNote', function() {
    expect(ctrl.genNote()).toEqual(middleC);
  });

  it('will return a random interval using genInterval', function() {
    expect(ctrl.genInterval()).toEqual(perfect4th);
  });

  it('setAnswer will supply the right answer from currentInterval', function() {
    ctrl.currentInterval = 5;
    inject(function() {
      midiPlayerSpy.intervals.and.returnValue(5);
    });
    ctrl.setAnswer();
    expect(ctrl.correctAnswer).toEqual('Perfect 4th')
  });

  it('will evaluate the users answer using isAnswerCorrect', function() {
    ctrl.enteredAnswer = 'WRONG';
    ctrl.correctAnswer = 'Major 2nd';
    expect(ctrl.isAnswerCorrect()).toBe(false);
  });

  it('will evaluate the users answer using isAnswerCorrect', function() {
    ctrl.enteredAnswer = 'Perfect 4th';
    ctrl.correctAnswer = 'Perfect 4th';
    expect(ctrl.isAnswerCorrect()).toBe(true);
  });

  it('will call the midiPlayer when playNotes is called', function() {
    console.log('Midiplayer: ' + ctrl.MidiPlayer);
    // spyOn(ctrl.MidiPlayer, 'playInterval')
    inject(function() {
      midiPlayerSpy.playInterval.and.returnValue(undefined);
    });
    expect(ctrl.MidiPlayer.playInterval).toHaveBeenCalledWith(middleC, perfect4th);
  });

  it('supplyAnswer will call newInterval when the answer is correct', function() {
    ctrl.enteredAnswer = 'Perfect 4th';
    ctrl.correctAnswer = 'Perfect 4th';
    spyOn(ctrl, 'newInterval');
    ctrl.supplyAnswer();
    expect(ctrl.newInterval).toHaveBeenCalled();
  });

  it('supplyAnswer will return false when the answer is wrong', function() {
    ctrl.enteredAnswer = 'WRONG';
    ctrl.correctAnswer = 'Major 2nd';
    expect(ctrl.supplyAnswer()).toBe(false);
  })

  it('newInterval calls genNote, genInterval and sets a new solution', function() {
    spyOn(ctrl, 'genNote')
    spyOn(ctrl, 'genInterval')
    spyOn(ctrl, 'setAnswer')
    ctrl.newInterval();
    expect(ctrl.genNote).toHaveBeenCalled();
    expect(ctrl.genInterval).toHaveBeenCalled();
    expect(ctrl.setAnswer).toHaveBeenCalled();
  });
});
