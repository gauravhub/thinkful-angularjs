angular.module('myApp', [])
  .controller('DisplayCtrl', function($scope) {
  	$scope.$on('showContent', function(event, data) {
  		$scope.content = data;
  	});
  })
  .controller('MultiplicationCtrl', function($scope, $attrs, $rootScope) {
  	function populateNumbers(x) {
  		var numbers = [];
  		for (var i = 0; i < x; i++) {
  			numbers[i] = i + 1;
  		};
	    return numbers;
  	}

  	$scope.numberLimit = $attrs.initialNumberLimit || 10;
 
  	$scope.compute = function(a, b) {
  		return a * b;
  	}

  	$scope.$watch('numberLimit', function(){
 		$scope.numbers = populateNumbers($scope.numberLimit);
  	});

  	var activeFactorA,  activeFactorB;
  	$scope.setActiveFactors = function(a, b) {
  		activeFactorA = a;
  		activeFactorB = b;
  	};

  	$scope.matchActiveFactors = function(a, b) {
  		return a == activeFactorA || b == activeFactorB;
  	};

  	$scope.clearActiveFactors = function() {
  		activeFactorA = activeFactorB = null;
  	};

  	$scope.setActiveNumber = function(activeNumber) {
  		$rootScope.$broadcast('showContent', activeNumber);
  	};
  });