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