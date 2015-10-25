(function () {

	var DashCtrl = function ($scope, $cordovaCamera, $state, $stateParams, $rootScope,$cordovaBarcodeScanner, $ionicPlatform, $ionicLoading, BarCodeFactory,ListingFactory) {

		// local scope variables
		$scope.imageDefined = false;
		$scope.imageSrc = '';
		$scope.statusMessage = '';
		$scope.cameraActive = false;
		$scope.imageCaptured = true;
		$scope.ISBN = '';
		var listing = {};
		$scope.listing = $stateParams.listingParam;
		
		
		// Book details
		// Local scope variables for book details
		$scope.bookFormData = {

			title: null,
			author: null,
			ISBN: null,
			type: null

		};
		$scope.listingFormData = {

			user: null,
			email: null,
			location: null,
			price: null,
			negotiable: false

		};

		// Dash functions
		// Sends the user to the first step in
		$scope.createListing = function () {

			$state.go('tab.add-image', { listingParam: listing });


		};
		// Sends the user to the first step in
		$scope.addBookDetails = function () {

			$state.go('tab.add-book-details', { listingParam: listing });

		};
		// Sends the user to the first step in
		$scope.addListingDetails = function () {

			$stateParams.listingParam.bookDetails = $scope.bookFormData;
			console.log($stateParams.listingParam.bookDetails);
			$state.go('tab.add-listing-details', { listingParam: $stateParams.listingParam });

		};
		// Sends the user to the first step in
		$scope.viewNewListing = function () {

			$stateParams.listingParam.listingDetails = $scope.listingFormData;
			$state.go('tab.view-new-listing', { listingParam: $stateParams.listingParam });

		};
		
		// local variables
		$scope.scanResults = '';
		$scope.appMessage = '';
		$scope.bookImage = '';

		function getBookInfo(isbnNumber) {
			$scope.appMessage = "now we're searching for your book in google database"
			BarCodeFactory.getBookData(isbnNumber)
				.then(function (response) {

					$ionicLoading.hide();
					if (response.data.hasOwnProperty("items")) {

						$scope.bookFormData.title = response.data.items[0].volumeInfo.title;
						$scope.bookFormData.author = response.data.items[0].volumeInfo.authors[0];
						$scope.bookFormData.ISBN = $scope.ISBN;
						$scope.bookFormData.type = "book";
						console.log(response);
						
					} else {

						$scope.scanResults = 'Unknown Book!';
						$scope.appMessage = "Your book is not in google's database";
					}

				}, function (response) {

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
						if (isbnNumber.length > 10) {

							var str = '13:';
							isbnNumber = str.concat(isbnNumber);
							$scope.appMessage = "greater than 13";
							console.log(isbnNumber);
							getBookInfo(isbnNumber);
							$scope.ISBN = isbnNumber;

						} else {

							var str2 = '10:'
							isbnNumber = str2.concat(isbnNumber);
							getBookInfo(isbnNumber);
							$scope.ISBN = isbnNumber;

						}
						// get book info
					
						
					}, function (error) {
						// An error occurred
						$scope.scanResults = 'Error: ' + error;
						$scope.appMessage = "Hey the scan failed!";
					});
			});
		}

		$scope.snapPicture = function () {
			$scope.imageDefined = false;
			console.log('inside snap picture method');

			try {

				document.addEventListener("deviceready", function () {

					var options = {
						quality: 50,
						destinationType: Camera.DestinationType.DATA_URL,
						sourceType: Camera.PictureSourceType.CAMERA,
						allowEdit: true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 300,
						targetHeight: 400,
						popoverOptions: CameraPopoverOptions,
						saveToPhotoAlbum: false,
						correctOrientation: true
					};

					$cordovaCamera.getPicture(options).then(function (imageData) {

						$scope.statusMessage = "Picture Saved!";
						$scope.imageDefined = true;
						$scope.imageSrc = "data:image/jpeg;base64," + imageData;
						$scope.cameraActive = true;						
						//write factory call here 
						listing.imageData = imageData;
						$scope.imageCaputed = true;


					}, function (err) {
						// error
					});

				}, false);

			} catch (e) {

				console.log('Device not loaded!');

			}

		}

	}

	angular.module('bookApp')
		.controller('DashCtrl', DashCtrl);

})();