capri.factory('Timer', function() {
  var default_time  = 60;
  this.hasFinished = false;
  this.timeLeft     = default_time;
  this.isTimerOn     = false;

  var turnOn = (function() {
    this.isTimerOn = true;
  });

  var turnOff = (function() {
    this.isTimerOn = false;
  });

  var countdown = (function() {
    if(this.isTimerOn && this.timeLeft > 0){
      this.timeLeft -= 1;
    }
    if(this.timeLeft <= 0) {
      this.hasFinished = true;
    }
  });

  return {
    timeLeft: this.timeLeft,
    turnOn  : turnOn,
    countdown: countdown,
    hasFinished: this.hasFinished
  };
});
