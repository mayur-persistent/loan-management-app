var ToneRestService = function(configService, restServiceProxy ) {
    this.toneAnalyserUrl = configService.siteUrl + '/tone';
	this.restServiceProxy = restServiceProxy;
	this.tokenURL=configService.siteUrl +"/api/token"
    this.audioAnalysisUrl = configService.siteUrl +"/analyze/audio/"
	function onSuccess(){
	}
};
/**
 * Handles all Product related API calls using REST based ajax APIs
 * @Class ProductRestService
 */

ToneRestService.prototype = {
    getTokenForSpeech : function(data, onSuccess ,onError) {
	   var url = this.tokenURL;
	   //var url = 'http://localhost:8080/loan-management-app/public/data/toneAnalysis.json';
        return this.restServiceProxy.get(url,{
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
	getToneAnalysedData : function(data, onSuccess ,onError) {
	   var url = this.toneAnalyserUrl;
	   //var url = 'http://localhost:8080/loan-management-app/public/data/toneAnalysis.json';
        return this.restServiceProxy.post(url,{ 
        	data: data,
             headers:{
               'Content-Type': 'application/x-www-form-urlencoded'
             },
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
    getAudioAnalysis : function(filename, onSuccess ,onError) {
	    var url = this.audioAnalysisUrl;
        return this.restServiceProxy.get(url+filename,{
            onSuccess : onSuccess,
            onError : onError,
            on400 : onError
        });
    },
};
