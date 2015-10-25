// Barcode service that request the restful api for book data related to the scanned code
(function(){ 
	
	var BarCodeFactory = function($http){
		
		var factory = {};
		
		factory.getBookData = function(isbnNumber){
			
			var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn' + isbnNumber;
			return $http.get(url);
		}
		
		return factory;
		
	}
	
	angular.module('bookApp')
		.factory('BarCodeFactory',BarCodeFactory);
	
 })();
 
