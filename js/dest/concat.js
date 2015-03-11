var app = angular.module('app', ['ui.router', 'ui.bootstrap'])

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

	// For any unmatched url, redirect to
	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
		url: "/",
		templateUrl: "partials/home.html",
		data: {
			name: "Home"
		}
	})

	.state('state1', {
		url: "/state1",
		templateUrl: "partials/state1.html",
		controller: function () {
		},
		data: {
		name: "State 1"
		}
	})

	.state('filesaver', {
		url: "/filesaver",
		templateUrl: "partials/filesaver.html",
		abstract: true,
		data: {
		name: "Filesaver.js",
		children: ["filesaver.option1", "filesaver.option2"]
		}
	})

	.state('filesaver.option1', {
		url: "/option1",
		templateUrl: "partials/option1.html",
		data: {
			name: "Option 1",
			children: false
		}
	})

	.state('filesaver.option2', {
		url: "/option2",
		templateUrl: "partials/option2.html",
		data: {
			name: "Option 2",
			children: false
		}
	})

})
app.directive('mainNavigation', function() {
	return {
		restrict: 'A',
		scope: {},
		templateUrl: 'partials/directives/menu.html',
		replace: true,
		controller: function($scope, $state) {
			
			var allChildren = [];
			// pass state to scope
			$scope.$state = $state;
			// get objects
			$scope.navigation = $state.get();
			$scope.navigation = $scope.navigation.splice(1, $scope.navigation.length);
			// Grab all children
			angular.forEach($scope.navigation, function(object) {
				if(object.data.children !== 'undefined'){
					// when we have children go through them and add them to an array
					angular.forEach(object.data.children, function(child) {
						allChildren.push(child);
					})
				}
			})
			
			// Remove children from $scope.navigation
			for(var i = 0; i < $scope.navigation.length; i++){
				for(var j = 0; j < allChildren.length; j++){
					if($scope.navigation[i].name === allChildren[j]){
						$scope.navigation.splice(i, 1);
					}
				}
			}
		},
		link: function(scope, element, attributes, ctrl) {}
	}
})
app.directive('titleHandler', function($window) {
  return {
    restrict: 'A',
    scope: {},
    controller: function($rootScope, $window) {
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			$window.document.title = toState.data.name;
		})
	},
	link: function(scope, element, attributes, ctrl) {}
  }
})
app.controller('fileSaverController', function($scope) {

	var date = new Date();
	var json = date.toJSON()
	var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
	
	$scope.save = function(name){
		saveAs(blob, name);
	}
	
})
app.controller('fileSaverExamplesController', function($scope, $http, $timeout) {

	// code examples
	$scope.htmlCode1 	= "";
	$scope.jsCode1		= "";
	$scope.htmlCode2	= "";
	$scope.jsCode2		= "";
	
	// Code examples path locations
	var htmlCode1Path	= "resources/data/example1/html.txt";
	var jsCode1Path		= "resources/data/example1/js.txt";
	var htmlCode2Path	= "resources/data/example2/html.txt";
	var jsCode2Path		= "resources/data/example2/js.txt";
	
	// get code examples
	$http.get(htmlCode1Path).success(function(data){
		$scope.htmlCode1 = data
	});
	$http.get(jsCode1Path).success(function(data){
		$scope.jsCode1 = data
	});
	$http.get(htmlCode2Path).success(function(data){
		$scope.htmlCode2 = data
	});
	$http.get(jsCode2Path).success(function(data){
		$scope.jsCode2 = data
		$timeout(function () {
			// Call prettyPrint to apply syntax highlighting on pre tags
			prettyPrint();
		}, 500);
	});

})