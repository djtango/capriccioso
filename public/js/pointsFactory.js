capri.factory('Points', function() {
  return {
    pointsTotal: 0,
    changePoints: function(differential) {
      var self = this;
      self.pointsTotal += differential;
    }
  };
});
