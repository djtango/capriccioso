capri.factory('Notes', function() {
  function randomNote(lowerBound, upperBound) {
    return Math.floor((Math.random() * (upperBound - lowerBound)) + lowerBound)
  };

  function randomInterval(maxInterval) {
    return Math.floor((Math.random() * maxInterval) + 1);
  };
  return {
    genNote     : randomNote,
    genInterval : randomInterval
  }
});
