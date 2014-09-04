'use strict';

angular.module('waitstaff-calculator', ['ngRoute', 'ngAnimate'])
	   .config(function($routeProvider) {
	   		$routeProvider
	   		.when('/', {
	   			template: '<h1>Welcome to waitstaff-calculator</h1>'
	   		})
	   		.when('/new-meal', {
	   			templateUrl: './new-meal.html',
	   			controller: 'MealDetailsCtrl'
	   		})
	   		.when('/my-earnings', {
	   			templateUrl: './earning-info.html',
	   			controller: 'EarningInfoCtrl'
	   		})
	   		.otherwise({
		        redirectTo : '/'
		    });	   		
	    })
    	.run(function($rootScope, $location, $timeout) {
			    $rootScope.$on('$routeChangeError', function() {
			        $location.path("/error");
			    });
			    $rootScope.$on('$routeChangeStart', function() {
			        $rootScope.isLoading = true;
			    });
			    $rootScope.$on('$routeChangeSuccess', function() {
			      $timeout(function() {
			        $rootScope.isLoading = false;
			      }, 1000);
			});
		})
		.controller('WaitStaffCtrl', function($scope) {
	   		$scope.initializeEarningInfo = function(){
		   		$scope.tips = [];
	   		}

	   		$scope.initializeCurrentMealDeatils = function(){
		   		$scope.currentMeal = {};
		   		$scope.currentCustomerCharges = {};
	   		}

	   		$scope.initializeEarningInfo();
	   		$scope.initializeCurrentMealDeatils();
	   }) 
	   .controller('MealDetailsCtrl', function($scope){
	   		initializeMealDetails();

	   		function initializeMealDetails() {
	   			$scope.submitted = false;
	   			$scope.customerCharges = $scope.$parent.currentCustomerCharges;
		   		$scope.meal = $scope.$parent.currentMeal;
	   		}

			$scope.submitMealDetails = function() {
				if($scope.mealDetailsForm.$invalid) {
	   				$scope.submitted = true;
	   			}
	   			else
	   			{
	   				computeCustomerCharges();
	   				saveCurrentMealDetailsAndEarningInfoInParentScope();
	   			}
			};

			$scope.reset = function() {
		   		$scope.$parent.currentMeal = {};
		   		$scope.$parent.currentCustomerCharges = {};
				initializeMealDetails();
			};

			function computeCustomerCharges() {
	   			$scope.customerCharges.subTotal = $scope.meal.baseMealPrice * (1 + $scope.meal.taxRate / 100.0);
	   			$scope.customerCharges.tip = $scope.customerCharges.subTotal * ($scope.meal.tipPercentage / 100.0);
	   			$scope.customerCharges.total = $scope.customerCharges.subTotal + $scope.customerCharges.tip;
			}

			function saveCurrentMealDetailsAndEarningInfoInParentScope() {
				$scope.$parent.tips.push($scope.customerCharges.tip);
   				$scope.$parent.currentMeal = $scope.meal;
   				$scope.$parent.currentCustomerCharges = $scope.customerCharges;
			}
	   })
	   .controller('EarningInfoCtrl', function($scope) {
	   		initializeEarningInfo();

	   		function initializeEarningInfo() {
	   			var mealCount = $scope.$parent.tips.length;
		   		$scope.earningInfo = {};
				$scope.earningInfo.tipTotal = getTotalTipAmount($scope.$parent.tips);
				$scope.earningInfo.mealCount = mealCount;
				$scope.earningInfo.tipPerMeal = ((mealCount > 0) ? ($scope.earningInfo.tipTotal * 1.0 / mealCount) : 0.0);	   
	   		}

	   		function getTotalTipAmount(tips) {
				var tipTotal = 0;
				for (var i = 0; i < tips.length; i++) {
					tipTotal += tips[i];
				}

				return tipTotal;
	   		}

			$scope.reset = function() {
				$scope.$parent.initializeCurrentMealDeatils();
				$scope.$parent.initializeEarningInfo();
				initializeEarningInfo();
			}		
	   });	