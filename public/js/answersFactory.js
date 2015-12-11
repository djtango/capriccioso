capri.factory('Answers', function() {

  function removeCorrectAnswer(array, interval) {
    var copiedArray = copyArray(array);
    copiedArray.splice(interval - 1, 1);
    return copiedArray;
  };

  function copyArray(array){
    var returnElement = function(element) { return element; };
    return array.map(returnElement);
  };

  function switchElementPlaces(array, position1, position2) {
    var saveElement1 = array[position1];
    array[position1] = array[position2];
    array[position2] = saveElement1;
  };

  function shuffleArray(array){
    var shuffleFromEnd = function(array) {
      var index, randomIndex;
      for (index = array.length -1; index > 0; index -= 1) {
        randomIndex = Math.floor(Math.random() * (index + 1));
        switchElementPlaces(array, index, randomIndex)
      }
      return array;
    };
    return shuffleFromEnd(shuffleFromEnd(copyArray(array)).reverse());
  };

  function threeIncorrectAnswers(array, currentInterval) {
    return shuffleArray(removeCorrectAnswer(array, currentInterval)).slice(0, 3);
  };

  function populateMultipleChoice(array, currentInterval) {
    var correctAnswer = array[currentInterval - 1];
    return shuffleArray(threeIncorrectAnswers(array, currentInterval).concat(correctAnswer));
  };

  return { populateMultipleChoice: populateMultipleChoice };

});
