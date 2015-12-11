capri.factory('Answers', function() {

  function removeCorrectAnswer(array, interval) {
    copyArray(array).splice(interval - 1, 1)
  };

  function copyArray(array){
    var returnElement = function(element) { return element; };
    return array.map(returnElement);
  };

  function switchElementPlaces(array, position1, position2){
    var saveElement1 = array[position1];
    array[position1] = array[position2];
    array[position2] = saveElement1;
  };

  function shuffleArray(array){
    var shuffleFromEnd = function(array) {
      var index = 0;
      var randomIndex = 0;
      for (index = copiedArray.length -1; index > 0; index -= 1) {
        randomIndex = Math.floor(Math.random() * (i + 1));
        switchElementPlaces(copyArray(array), index, randomIndex)
      }
    };
    return shuffleFromEnd(shuffleFromEnd(copiedArray).reverse);
  };

  function threeIncorrectAnswers(array, currentInterval) {
    return shuffleArray(removeCorrectAnswer(array, currentInterval)).slice(0, 3);
  };

  function populateMultipleChoice(array, currentInterval) {
    var correctAnswer = array[currentInterval - 1];
    shuffleArray(threeIncorrectAnswers(array, currentInterval).push(correctAnswer));
  };

  return { populateMultipleChoice: populateMultipleChoice };

});
