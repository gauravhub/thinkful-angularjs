 angular.module('editableItemDirectiveApp', [])
 		.directive('makeEditable', function(){
 			return {
 				scope: true,
 				restrict: 'A',
 				templateUrl: 'makeEditable.html',
 				transclude: true,
 				replace: true,
 				link: function($scope, element, attrs) {
 					$scope.mode = 'view';
 					$scope.buttonText = 'Edit';

 					$scope.toggleMode = function() { 
 											if($scope.mode === 'view') {
 												$scope.mode = 'edit';
 												element.attr('contentEditable',true);
												$scope.buttonText = 'Save';
 											} 
 											else {
 												$scope.mode = 'view'; 
 												element.removeAttr('contenteditable');
												$scope.buttonText = 'Edit';
 											}
 										}
 				}
 			};
 		});
