angular.module("instagramSearcherApp", ['ngAnimate']);
angular.module("instagramSearcherApp")
	   .controller("instagramSearchCtrl", function($scope, $http) {
			$scope.searchTerm = '';
			$scope.searchResultsSummary = 'Enter tag and click search to find photos on Instagram !';
			$scope.submitted = false;
			$scope.searchResult = [];

			$scope.search = function(term) {
	   			if($scope.searchTermForm.$invalid) {
	   				$scope.submitted = true;
	   			}
	   			else
	   			{
	   				$scope.submitted = false;
		   	 		$scope.searchResultsSummary = 'Searching Instagram for photos tagged with "' + term + '"';
		   	 		var searchURL = 'https://api.instagram.com/v1/tags/' + 
		   	 				   		term + 
		   	 				  		'/media/recent?client_id=5da84f4fbc7b42aca51eac2226523809&callback=JSON_CALLBACK'
					$scope.searchTerm = '';
		   	 		$http(
		   	 				{
		   	 					method: 'jsonp', 
		   	 					url: searchURL
		   	 				}
		   	 			)
		   	 			.success(function(response, status, headers, config) {
		   	 				if(response.data.length > 0)
		   	 				{
		   	 					$scope.searchResultsSummary = 'We found ' + response.data.length + ' results for "' + term + '"';
		   	 				}
		   	 				else
		   	 				{
		   	 					$scope.searchResultsSummary = 'No photos found tagged with "' + term + '"';
		   	 				}
		   	 				$scope.searchResult = response.data;
						})
						.error(function(response, status, headers, config) {
									$scope.searchResult = [];
									$scope.searchResultsSummary = 'Fatal error: Could not fetch photos tagged with "' + term + '"';
							  	}); 
	   			}
	   		}
	   });