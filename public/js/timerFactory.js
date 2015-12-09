capri.factory('Timer', function() {
  var default_time  = 5;
  this.timeLeft     = default_time;
  this.isTimerOn     = false;

  var turnOn = (function() {
    this.isTimerOn = true;
  });

  var turnOff = (function() {
    this.isTimerOn = false;
    console.log('turnOff is being called');
    console.log(this.isTimerOn);
  });

  var countdown = (function() {
    if(this.isTimerOn && this.timeLeft > 0){
      this.timeLeft -= 1;
    }
  });

  return {
    timeLeft: this.timeLeft,
    turnOn  : turnOn,
    countdown: countdown,
  };
});
