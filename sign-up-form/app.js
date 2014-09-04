 angular.module('signUpApp', [])
 		.directive('optIn', function(){
 			return {
 				templateUrl: './optIn.html',
 				restrict: 'E',
 				transclude: true,
 				replace: true
 			};
 		})
 		.directive('brandLogo', function(){
 			return {
 				templateUrl: './brandLogo.html',
 				restrict: 'C'
 			};
 		});