angular.module('angular', []).controller('NowDate', ['$scope', function($scope){
	$scope.date = {
    		now: new Date()
   		 };
	var getDate = function(){
		$scope.date.now = new Date();
	};
    setInterval(function(){
    	$scope.$apply(getDate);
    },1000);
	
getDate();
}])


