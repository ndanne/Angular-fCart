(function () {
    'use strict';
 
    angular
	.module('gameArenaApp', ['ngRoute', 'ngResource'])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	  $routeProvider
	  .when('/games', {
			templateUrl: 'GamesArena.html',
			
			controller: 'gameMainCtrl',
			controllerAs: 'gameVm'
	    })
	  .when('/games/:game_id', {
			templateUrl: 'GameDetail.html',			
			controller: 'gameDetailCtrl',
			controllerAs: 'vmGame'
	    })
	    .when('/newGame', {
			    templateUrl: 'NewGame.html',
			    controller: 'NewGameCtrl',
			    controllerAs: 'newGm',
			   /* resolve: {
			    	game: function($route, gameData){
			    		return gameData.getGames($route.current.pathParams.game_id).$promise;
			    	}
			    }*/
	    })
	    .otherwise({redirectTo:"/games"});
	    //$locationProvider.html5Mode({ enabled: true, requireBase: false });
	}])
	
	.controller('gameMainCtrl', gameMainCtrl)
	.controller('NewGameCtrl', NewGameCtrl)
	.controller('gameDetailCtrl', gameDetailCtrl)
.filter('startFrom', function() {
    return function(input, start) {    	
    	if (input === undefined || input === null || input.length === 0){
    	 return [];
    	}
        start = +start; //parse to int
        return input.slice(start);
    }
})
.factory('gameData', ['$resource', function gameData($resource){
		var resource = $resource('http://localhost:3000/api/games/:game_id', {game_id: '@game_id'}, {"getAll": {method:'GET', isArray: true, params:{something: "foo"}}});
		return {
			getGames: getGames,
			saveGame: saveGame,			
			getAllGames: getAllGames,
			updateGame: updateGame,
			deleteGame: deleteGame
		}	
		function getGames(gameId){
			return resource.get({game_id:gameId});			
		}
		function saveGame(game){
			return resource.save(game);
		}
		function getAllGames(){
			return resource.query();
		}
		function updateGame(id){
			return resource.put({game_id:id});
		}
		function deleteGame(id){
				return $resource({method:'DELETE', url:'http://localhost:3000/api/games/'});
		}
	}]);
	//.controller('gameMainCtrl', ['gameData',  ])
	gameMainCtrl.$inject = ['gameData'];
	gameDetailCtrl.$inject = ['gameData', '$routeParams', '$location'];
	NewGameCtrl.$inject = ['$scope', 'gameData'];
	function gameMainCtrl(gameData) {
		var vm =this;
		//vm.maintitle = "Game Arena";
		vm.gamesArena = [];
		//console.log(gameData);
		/*vm.$route = $route;
		vm.$location = $location;
		*/
			gameData.getGames()
				.$promise.then(success)
				.catch(erorr);
			function success(games){
				vm.gamesArena = games.GamesArena;				
			}
			function erorr(response){
				console.log(response);
			}
			vm.currentPage 	= 0;
			vm.pageSize 	= 4;
			vm.numberOfPages= function(){
		        return Math.ceil(vm.gamesArena.length/vm.pageSize);   
		    }
	}
	function gameDetailCtrl(gameData, $routeParams, $location){
		var vm =this;
		vm.gamesArena = [];
		vm.$location = $location;
		vm.$routeParams = $routeParams;

			 gameData.getGames($routeParams.game_id)
				.$promise.then(success)
				.catch(erorr);
			function success(game){				
				vm.gamesArena = game.GamesArena[0];
				console.log(vm.gamesArena);		
			}
			function erorr(response){
				console.log(response);
			}
	}
	function NewGameCtrl($scope, gameData){
		$scope.saveGame =  function(game, newGameForm){
			if(newGameForm.$valid){
				console.log("Form valid succefully");
				gameData.saveGame(game)
				.$promise.then(function(response){
						console.log(response);
						window.location ='/';
					},function(response){
						console.log(response);
					})
			}
		};
		$scope.cancelBtn = function(){
			window.location ='#/newGame';
		}
	}

})();
