(function(){ 
	
	var ListingViewCtrl = function($scope,$state,$stateParams,ListingFactory){
		
		// Local Scope Variables
		$scope.listing = $stateParams.listingParam;
		$scope.statusMessage=''
		$scope.imageSrc = "data:image/jpeg;base64," + $scope.listing.imageData;
		
		console.log($stateParams.listingParam);
		
		$scope.saveListing = function () {

			console.log($stateParams.listingParam);
			
			ListingFactory.new($scope.listing)
				.then(function(response){
					
					// handle success
					$scope.statusMessage = 'listing published successfully';
					console.log('Hey it was a success!');
					
				},function(response){
					
					// handle error
					console.log('Hey it failed!');
					$scope.statusMessage = 'list publish failed!';
				})			
			
		};
		
	}
	
	angular.module('bookApp')
		.controller('ListingViewCtrl',ListingViewCtrl);
	
 })();