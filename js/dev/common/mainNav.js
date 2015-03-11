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