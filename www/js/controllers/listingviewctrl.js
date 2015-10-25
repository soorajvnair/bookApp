(function(){ 
	
	var ListingViewCtrl = function($scope,$state,$stateParams,ListingFactory){
		
		// Local Scope Variables
		$scope.listing = $stateParams.listingParam;
		$scope.imageSrc = "data:image/jpeg;base64," + $scope.listing.imageData;
		
		console.log($stateParams.listingParam);
		
		$scope.saveListing = function () {

			console.log($stateParams.listingParam);
			
			ListingFactory.new($scope.listing)
				.then(function(response){
					
					// handle success
					
				},function(response){
					
					// handle error
				})			
			
		};
		
	}
	
	angular.module('bookApp')
		.controller('ListingViewCtrl',ListingViewCtrl);
	
 })();