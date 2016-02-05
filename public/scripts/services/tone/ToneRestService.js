var ToneRestService = function(configService, restServiceProxy ) {
    this.toneAnalyserUrl = configService.siteUrl + '/tone';
	this.restServiceProxy = restServiceProxy;
	
	function onSuccess(){
	}
};
/**
 * Handles all Product related API calls using REST based ajax APIs
 * @Class ProductRestService
 */

ToneRestService.prototype = {    
	getToneAnalysedData : function(data, onSuccess ,onError) {
	   var url = this.customerByPath;
	   var url = 'http://localhost:8080/loan-management-app/public/data/toneAnalysis.json';
        return this.restServiceProxy.post(url,{ 
        	data: data,
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
};
