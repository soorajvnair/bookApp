(function(){ 
	
	var ListingFactory = function($http){
		
		var factory = {};
		
		factory.new = function(){
			
			return $http.post('');
			
		} 
		
		return factory;
		
	}
	
	angular.module('bookApp')
		.factory('ListingFactory',ListingFactory);
	
 })();