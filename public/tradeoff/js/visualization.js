$( document ).ready(function() {
    var taClient = null;
    console.log( "ready!" );
    var path = 'tradeoff/problems/trade_off_input.json';
    var problemJson;
    $.getJSON(path, function(data) {
      problemJson=data;
    });
    function loadTradeoffAnalytics(profile, themeName, callback, errCallback) {
        taClient = new TA.TradeoffAnalytics({
            dilemmaServiceUrl: 'demo/dilemmas',
            customCssUrl: 'http://ta-cdn.mybluemix.net/modmt/styles/' + themeName + '.css',
            profile: profile,
            errCallback: errCallback
        },'taWidgetContainer');
        taClient.start(callback);
        
    }
    function onError(error) {
        var errorMsg = 'Error processing the request.';
        $('.errorMsg').text(error ? JSON.stringify(error, null, 4) : errorMsg);
        $('.errorArea').show();
        onPageReady();
    }
    function onPageReady() {
        $('.analyze').show();
        $('.loading').hide();
        taClient.show(problemJson);
    }
    function onResultsReady() {
        $('.analyze').show();
        $('.loading').hide();
    }
    loadTradeoffAnalytics('basic', 'watson', onPageReady, onError);
    
    
});