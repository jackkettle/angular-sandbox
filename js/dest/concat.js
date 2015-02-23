// Testing

var app = angular.module('app', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

  // For any unmatched url, redirect to
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/home.html",
      controller: function () {
      },
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
    
    .state('state2', {
      url: "/state2",
      templateUrl: "partials/state2.html",
      abstract: true,
      controller: function () {
      },
      data: {
        name: "State 2",
        children: ["state2.option1", "state2.option2"]
      }
    })
    
    .state('state2.option1', {
      url: "/option1",
      templateUrl: "partials/option1.html",
      data: {
        name: "Option 1",
        children: false
      }
    })
    
    .state('state2.option2', {
      url: "/option2",
      templateUrl: "partials/option2.html",
      data: {
        name: "Option 2",
        children: false
      }
    })
})

.controller('rootController', function($rootScope, $state) {
  
  // update title on state change
  $rootScope.$on('$stateChangeSuccess', 
  function(event, toState, toParams, fromState, fromParams){
    $rootScope.title = toState.data.name;
  })
})

.directive('mainNavigation', function() {
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
    link: function(scope, element, attributes, ctrl) {
    }
  }
})
