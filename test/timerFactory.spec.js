describe("Timer", function() {
  var timer;
  beforeEach(module('Capriccioso'));

  beforeEach(inject(function(Timer) {
    timer = Timer;
  }));

  it("initializes with a time remaining of 60 seconds", function() {
    expect(timer.timeLeft).toEqual(60);
  });

  it("does not decrement the time if the timer is off", function() {
    timer.countdown();
    expect(timer.timeLeft).toEqual(60);
  });

  it("only decrements time if the timer is on", function() {
    timer.turnOn();
    timer.countdown();

    expect(timer.timeLeft).toEqual(59);
  });
});
