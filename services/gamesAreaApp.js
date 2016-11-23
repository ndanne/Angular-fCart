(function () {
    'use strict';
 
    angular
	.module('gameArenaApp', ['ngRoute'])

	.config(function($routeProvider, $locationProvider) {
	  $routeProvider.when('/', {
			    template: '<div>this is jsut testing</div>',
			 //   controller: 'gameMainCtrl',
	    })
	    .when('/games/:gameId', {
			     templateUrl: 'book.html',
			    controller: 'BookController',
	    }).otherwise("/");
	     $locationProvider.html5Mode(true);
	})
	.controller('gameMainCtrl', ['gameData',  function gameMainCtrl(gameData) {
		var vm =this;
		vm.maintitle = "Game Arena";
		vm.gamesArena = [];
		//console.log(gameData);
		/*vm.$route = $route;
		vm.$location = $location;
		vm.$routeParams = $routeParams;*/
			gameData.getGames().success(function(data, status, headers, config){
				console.log(data);
				vm.gamesArena = data.GamesArena;	
				vm.currentPage 	= 0;
				vm.pageSize 	= 4;
				vm.numberOfPages= function(){
			        return Math.ceil(vm.gamesArena.length/vm.pageSize);   
			    }
			}).error(function(data, status, headers, config){
				//$log.warn(data, status, headers(), config);
				console.log(status);
			});
	}])
	
.filter('startFrom', function() {
    return function(input, start) {    	
    	if (input === undefined || input === null || input.length === 0){
    	 return [];
    	}
        start = +start; //parse to int
        return input.slice(start);
    }
})
.factory('gameData', ['$http', function gameData($http){
		return {
			getGames: function(){
				return $http({method:'GET', url:'http://localhost:3000/api/games/'});
				//return $http({method:'GET', url:'gamesArenaData.json'});
			},
			saveGame: function(){
				return $http({method:'POST', url:'http://localhost:3000/api/games/'});
			},			
			getGame: function(id){
				return $http({method:'GET', url:'http://localhost:3000/api/games/'});
			},
			updateGame: function(id){
				return $http({method:'PUT', url:'http://localhost:3000/api/games/'});
			},
			deleteGame: function(id){
				return $http({method:'DELETE', url:'http://localhost:3000/api/games/'});
			}
		}			
	}]);


})();


/*
.factory('gameData', ['$http', function gameData($http){	
		return {
			getGames: function(){
				return $http({method:'GET', url:'gamesArenaData.json'});
			},
			saveGame: function(){
				return $http({method:'POST', url:'gamesArenaData.json'});
			},
			getGame: function(id){
				return $http({method:'GET', url:'gamesArenaData.json'});
			},
			deleteGame: function(id){
				return $http({method:'Delete', url:'gamesArenaData.json'});
			}
		}			
	}]);
*/	