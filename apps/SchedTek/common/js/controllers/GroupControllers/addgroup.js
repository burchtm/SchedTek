App.controller('groupAddController', ['$scope', 'SharedUserService', '$location', function($scope, SharedUserService, $location){
	$scope.User = SharedUserService;
	
	//adds group and the current user into DB
	$scope.add = function(){
		if($scope.gname==null || $scope.gdesc==null){
			$scope.message = "Please Try Again";
			return;
		}
		
		console.log($('#name').val() + " " + $('#desc').val() + " " + $scope.User.userID);
		var Data = {
				adapter : 'SchedTekDB',
				procedure : 'addGroupProc',
				parameters : [$('#name').val(), $('#desc').val(), $scope.User.userID]
		};

		WL.Client.invokeProcedure(Data,{
			onSuccess : groupAdded,
			onFailure : groupNotAdded
		});

		function groupAdded(result){
			console.log("Success");
			$location.path("/group");
			$scope.$apply();
		}

		function groupNotAdded(result){
			console.log("FAILURE!");
			$location.path("/group");
		}
		
	}
	
}]);

