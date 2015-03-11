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