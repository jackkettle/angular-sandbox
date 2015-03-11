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