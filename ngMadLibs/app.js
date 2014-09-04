	angular.module('madLibsApp', ['ngAnimate']);
	angular.module('madLibsApp')
		   .controller('madLibsController', function($scope){
		   		function initializeMadLibs() {
			   		$scope.name = ''; 
			   		$scope.job_title = ''; 
			   		$scope.tedious_task = ''; 
			   		$scope.dirty_task = ''; 
			   		$scope.celebrity = ''; 
			   		$scope.obnoxious_celebrity = '';
			   		$scope.adjective = '';
			   		$scope.useless_skill = '';
			   		$scope.huge_number = '';
			   		$scope.showWords = true;
		   			$scope.submitted = false;
		   		}

		   		function initializeGender() {
			   		$scope.gender = 'male';
				   	$scope.namePlaceholder = 'male name';
		   		}

		   		$scope.he_or_she = function () { return ($scope.gender == 'male') ? 'he' : 'she' };
		   		$scope.his_or_her = function () { return ($scope.gender == 'male') ? 'his' : 'her' };
		   		$scope.him_or_her = function () { return ($scope.gender == 'male') ? 'him' : 'her' };

		   		$scope.updateName = function() {
		   			if($scope.gender == 'male') {
			   			$scope.namePlaceholder = 'male name';
		   			}

		   			if($scope.gender == 'female') {
			   			$scope.namePlaceholder = 'female name';
		   			}
		   		};

		   		$scope.generateMadLib = function() {
		   			if($scope.wordsForm.$invalid) {
		   				$scope.submitted = true;
		   			}
		   			else
		   			{
			   			$scope.showWords = false;
		   			}
		   		};

		   		$scope.reset = function() {
		   			initializeMadLibs();
		   			$scope.updateName();
		   		};

		   		initializeMadLibs();
		   		initializeGender();
		   });