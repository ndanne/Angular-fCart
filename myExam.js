'use strict';

angular.module('myExam', [])

.controller('examQusController', function($scope, examData, $log, $document) {
	console.log($scope);
	//var pos = 0, test, question, choice, choices, correct = 0;		 
		/*$scope.$watch('fname', function(v){
		  $scope.id = v;
		});*/

		$scope.questions = [];
		examData.getQuestion().success(function(data, status, headers, config){
			//console.log(data); console.log(status); console.log(headers);
				$scope.questions 	= data;				
				$scope.currentPage 	= 0;
				$scope.pageSize 	= 5;
				$scope.numberOfPages= function(){
			        return Math.ceil($scope.questions.length/$scope.pageSize);   
			    }
			    $scope.test_status = "Started with "+$scope.questions.length+" Questions";
			}).error(function(data, status, headers, config){
				$log.warn(data, status, headers(), config)
			});
		
		$scope.onSelect = function (option, question) {
			console.log($scope.questions);
			console.log("question-->"+question+" &option-->"+option);
			//var ans ='isAns'+question;
			console.log(option);
			//$scope.ans = true;
			$scope.isCorrect = function (index) {
		        var result = 'correct';
		        angular.forEach($scope.questions[index].options, function (option, index, array) {
		            if (helper.toBool(option.Selected) != option.IsAnswer) {
		                result = 'wrong';
		                return false;
		            }
		        });
		        return result;
    		};
		}

	    $scope.isAnswered = function (mindex, choices) {
	        var answered = 'Not Answered';
	         var result = 'correct';
	        var ans = $scope.questions[mindex].answer;
	        angular.forEach($scope.questions[mindex].options, function (element, index, array) {
	        	console.log(index);
	        	console.log(ans);
	        	//console.log(angular.element(document).find('choices'+mindex));
	            if (index == ans) {
	            	result = 'correct';
	                answered = 'Answered';
	                return false;
	            }else{
	            	result = 'wrong';
	            }
	        });
	        return answered;
   		 };
})
.factory('examData', function($http){	
	return {
		getQuestion: function(){			
			return $http({method:'GET', url:'examDataOO.json'});
		}	
	}			
})
.filter('startFrom', function() {
    return function(input, start) {    	
    	if (input === undefined || input === null || input.length === 0){
    	 return [];
    	}
        start = +start; //parse to int
        return input.slice(start);
    }
})
.directive('testDir', function(){
	return {
		priority: 0,
		/*template: '<div></div>',*/
		templateUrl: 'testdir.html',
		replace: true,
		transclude: false,
		restrict: 'E',
		controller: 'examQusController',
		compile: function(scope, iElement, iAttrs, controller){
			return {
				pre: function preLink(scope, iElement, iAttrs, controller){
					console.log(iElement);
				},
				post: function postLink(scope, iElement, iAttrs, controller){
					console.log(iElement);
				}
			}
		},
	}

})
.directive('sideBar', function(){
	return {
		priority: 0,
		/*template: '<div></div>',*/
		templateUrl: 'sidebar.html',
		replace: true,
		transclude: false,
		restrict: 'E',
		scope: {},
		/*require: '^?ngModel',*/
		controller: function($scope, $element, $attrs){
			console.log("Dir controller..");
			$scope.namePr = "Nagaraju Danne";
			$scope.desig = "Technology Lead";
			$scope.pathimg = "nobody.jpg";
		},
		compile: function(scope, iElement, iAttrs, controller){
			return {
				pre: function preLink(scope, iElement, iAttrs, controller){
					//console.log("compile Pree..");
				},
				post: function postLink(scope, iElement, iAttrs, controller){
					//console.log("compile post...");
				}
			}
		},
		link: function postLink(scope, iElement, iAttrs, controller){
			//console.log("link link.."); Karthi@12
		}
	}
});
