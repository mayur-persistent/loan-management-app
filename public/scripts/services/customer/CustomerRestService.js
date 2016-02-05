/**
 * CustomerRestService
 * @class CustomerRestService
 * @constructor
 * @param configService Configuration service
 * @param restServiceProxy REST proxyService service
 */
var CustomerRestService = function(configService, restServiceProxy ) {
    this.customerInfoUrl = configService.siteUrl + '/api/v1/customers/';
	this.searchUrl = configService.siteUrl + '/api/v1/customers';
	this.customerByPath = configService.siteUrl + '/api/v1/customers/by_paths';
	this.customerByNode = configService.siteUrl + '/api/v1/customers/by_nodes';
	this.successPathUrl = configService.siteUrl + '/api/v1/actualPaths';
	this.successNodesUrl = configService.siteUrl + '/api/v1/actualNodes';
	this.restServiceProxy = restServiceProxy;
	function onSuccess(){
	}
};
/**
 * Handles all customer management related API calls using REST based ajax APIs
 * @Class CustomerRestService
 */

CustomerRestService.prototype = {

    /**
     * get customer profile
     * @method getCustomerProfile
     * @param id 
     * @param onSuccess
     * @param onError
     */
    getCustomerProfile : function(customerId, onSuccess ,onError) {
		
        return this.restServiceProxy.get(this.customerInfoUrl + customerId,{ 
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
	
    searchCustomer : function(params,onSuccess ,onError) {
		
    	var paramsUrl="?";
    	angular.forEach(params, function(value, key) {
    		paramsUrl=paramsUrl+key+"="+value+"&";
    	});
    	var url = this.searchUrl+paramsUrl;
    //	var url = 'http://localhost:8080/WealthMangement/web-src/data/customerList.json';
    	return this.restServiceProxy.get(url,{ 
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
   getCustomerByPath : function(pathData, onSuccess ,onError) {
	   var url = this.customerByPath;
	  // var url = 'http://localhost:8080/WealthMangement/web-src/data/customerListByPath.json';
        return this.restServiceProxy.post(url,{ 
        	dynamicPathList :pathData,
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
    getCustomerByNode : function(nodeData, onSuccess ,onError) {
 	   var url = this.customerByNode;
 	  // var url = 'http://localhost:8080/WealthMangement/web-src/data/customerListByPath.json';
         return this.restServiceProxy.post(url,{ 
        	 nodeList :nodeData,
             onSuccess : onSuccess,
             onError : onError,
             on400 : onError
         });
     },
     getSuccessPaths : function(params,onSuccess ,onError) {
    	var paramsUrl="?";
     	angular.forEach(params, function(value, key) {
     		paramsUrl=paramsUrl+key+"="+value+"&";
     	});
         return this.restServiceProxy.get(this.successPathUrl +paramsUrl,{ 
             onSuccess : onSuccess,
             onError : onError,
             on400 : onError
         });
     },
     getCustomerByFirstlevelNode : function(params, onSuccess ,onError) {
   	  
		   	var paramsUrl="?";
		 	angular.forEach(params, function(value, key) {
		 		paramsUrl=paramsUrl+key+"="+value+"&";
		 	});
		 	var url = this.successNodesUrl +paramsUrl;
		 	//var url = 'http://localhost:8080/WealthMangement/web-src/data/level1NodeList.json';
		     return this.restServiceProxy.get(url,{ 
		         onSuccess : onSuccess,
		         onError : onError,
		         on400 : onError
		     });
       },
}

   