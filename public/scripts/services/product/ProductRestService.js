var ProductRestService = function(configService, restServiceProxy ) {
    this.productsUrl = configService.siteUrl + '/api/v1/products';
	this.restServiceProxy = restServiceProxy;
	
	function onSuccess(){
	}
};
/**
 * Handles all Product related API calls using REST based ajax APIs
 * @Class ProductRestService
 */

ProductRestService.prototype = {    
		getAllproducts : function(onSuccess ,onError) {
		var url = this.productsUrl;
		//var url = '/WealthMangement/web-src/data/productData.json';
    	return this.restServiceProxy.get(url,{ 
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    }
};

   