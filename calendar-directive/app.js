 angular.module('calendarDirectiveApp', [])
 		.directive('calendar', function(){
	        return {
	            restrict: 'E',
	            templateUrl: 'calendar.html',
	            scope: true,
	            transclude: true,
	            controller: function($scope) {
	            	this.setCalendar = function(year, month) {
	            		var range = CalendarRange.getMonthlyRange(new Date(year, month));
	            		$scope.days = range.days;
	            		$scope.start = range.start;
	            		$scope.end = range.end;
	            	}

	            	$scope.excludeDayClass = function(date) {
	            		if(date < $scope.start || date > $scope.end) {
	            			return 'excludeDay';
	            		}
	            		else {
	            			return '';
	            		}
	            	}
	            }
	        }
	    })
	    .directive('calendarRange', function(){
	        return {
	            require: '?^calendar',
	            restrict: 'EA',
	            templateUrl: 'calendarRange.html',
	            link: function(scope, element, attrs, calendarController) {
		            	scope.months = [
						            		{ text: 'January', value:0 },
						            		{ text: 'February', value:1 },
						            		{ text: 'March', value:2 },
						            		{ text: 'April', value:3 },
						            		{ text: 'May', value:4 },
						            		{ text: 'June', value:5 },
						            		{ text: 'July', value:6 },
						            		{ text: 'August', value:7 },
						            		{ text: 'September', value:8 },
						            		{ text: 'October', value:9 },
						            		{ text: 'November', value:10 },
						            		{ text: 'December', value:11 }
						            	];
						var month = attrs["month"] ? (parseInt(attrs["month"]) - 1) : (new Date()).getMonth();
		            	scope.selectedMonth = scope.months[month];	
		            	scope.selectedYear = attrs["year"] ? parseInt(attrs["year"]) : (new Date()).getFullYear();	
		            	scope.years = [];
		            	for(var index = -20; index <= 20; index++) {
		            		scope.years.push(scope.selectedYear + index);
		            	}

		                scope.calendarController = calendarController;
		            	calendarController.setCalendar(scope.selectedYear, scope.selectedMonth.value);
		            	$(element.find("select[id='selectMonth']")[0]).change(function() {
		            		scope.$apply(function(){
				            	calendarController.setCalendar(scope.selectedYear, scope.selectedMonth.value);
		            		});
		            	});

		            	$(element.find("select[id='selectYear']")[0]).change(function() {
		            		scope.$apply(function(){
				            	calendarController.setCalendar(scope.selectedYear, scope.selectedMonth.value);
		            		});
		            	});
		            }	            
	        }
	    });
