(function(){ 
	
	var ListingFactory = function($http){
		
		var factory = {};
		
		factory.new = function(data){
			
			return $http.post('charcoalbeak-arcledev.rhcloud.com/api/createlisting/',data);
			
		} 
		
		return factory;
		
	}
	
	angular.module('bookApp')
		.factory('ListingFactory',ListingFactory);
	
 })();