// controller for barcode scanner



(function () {

	var BarCodeCtrl = function ($scope, $ionicActionSheet, $cordovaBarcodeScanner, $ionicPlatform, $ionicLoading, BarCodeFactory) {
		
		// local variables
		$scope.scanResults = '';
		$scope.appMessage = '';
		$scope.bookImage = '';

		function getBookInfo(isbnNumber) {
			$scope.appMessage = "now we're searching for your book in google database"
			BarCodeFactory.getBookData(isbnNumber)
				.then(function (response) {


					$scope.appMessage = "Hey returned data from google";
					if (response.data.hasOwnProperty("items")){
						
						$scope.scanResults = "The Book title is : " +
						  response.data.items[0].volumeInfo.title;
						  console.log(response);
						  if(response.data.items[0].hasOwnProperty("volumeInfo")){
							  
							  if(response.data.items[0].volumeInfo.hasOwnProperty("imageLinks")){
								  
								  $scope.bookImage = response.data.items[0].volumeInfo.imageLinks.thumbnail;
								  $ionicLoading.hide();
							  }
							  else{
								  
								  $scope.bookImage = '';
								  $ionicLoading.hide();
								  
							  }
							  
						  }
					}else{
						
						$scope.scanResults = 'Unknown Book!';
						$scope.appMessage = "Your book is not in google's database";
					}
										
		},function(response) {

			$scope.appMessage = "google refused!";
			console.log('An Error Occured!');
			$scope.scanResults = "An Error Occured!";
			$ionicLoading.hide();
		})
			
	}

	$scope.scanCode = function () {

		$ionicPlatform.ready(function () {
			$cordovaBarcodeScanner
				.scan()
				.then(function (result) {
					var isbnNumber = result.text;
					$scope.appMessage = "Hey the scan was successful!";
						$ionicLoading.show({
							template: 'Loading...'
						});					
					if(isbnNumber.length >10){
						
						var str = '13:';
						isbnNumber =  str.concat(isbnNumber);
						$scope.appMessage = "greater than 13";
						console.log(isbnNumber);
						getBookInfo(isbnNumber);
						
					}else{
						
						var str2 = '10:'
						isbnNumber = str2.concat(isbnNumber);
						getBookInfo(isbnNumber);
						
					}
					// get book info
					
						
				}, function (error) {
					// An error occurred
					$scope.scanResults = 'Error: ' + error;
					$scope.appMessage = "Hey the scan failed!";
				});
		});
	}



}
	
	angular.module('bookApp')
	.controller('BarCodeCtrl', BarCodeCtrl);

})();