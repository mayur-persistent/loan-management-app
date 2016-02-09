'use strict';
/**
 * The CustomerController controller manages the customer
 *
 * @class CustomerController
 * @constructor
 * @param $scope {angular}
 */

app.controller('CustomerController', ['$scope', '$rootScope', '$routeParams', '$http', '$sce', 'customerService','$location','toneAnalyserService', 'UILoader','$timeout'
       	                           	,function($scope, $rootScope, $routeParams, $http, $sce, customerService,$location,toneAnalyserService, UILoader,$timeout) {

    $scope.toggle = function($event){  
        var item = $event.target.parentNode;
      //  var item = $(this).parent('.faq-item');
        
        if(angular.element(item).hasClass("active"))
            angular.element($event).find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
        else
            angular.element($event).find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
        
        angular.element(item).toggleClass("active");
        
        onresize(300);
    };

	$scope.loaderMessage = 'Analysing ..';
    $scope.selectedEmail = {};
	$scope.emails = [];
	$scope.emails.push({'msgId':'1', 'sender':'Halim Dwivedi', 'mailid':'halimDwivedi@domain.com', 'date':'Today Feb 9 11:15', 'subject':'Re : Delay in payment','text':'Hi Dmitry,<br>This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.<br>Kindly bear with problem and could you please let me know the future course of action. <br><br>Halim Dwivedi', 'additional':null})
	$scope.emails.push({'msgId':'2', 'sender':'Halim Dwivedi', 'mailid':'halimDwivedi@domain.com', 'date':'Today Feb 9 14:00', 'subject':'Personal Loan Enquiry','text':'Hi Dmitry,<br>I am an account holder in your bank with my saving/ current number 003-117-454646. <br> I had applied for personal loan loan in your esteemed bank. But the loan is not approved for one or another reason. <br>  I have fulfilled all conditions as demanded by your bank staff but now they are saying that the loan cannot be approved for the reason (provide the reason of rejection as given by staff).<br>I request you to consider my application again and guide me that what should I do to get approval.<br><br>Thanking you.<br>Halim Dwivedi', 'additional':null})
	$scope.emails.push({'msgId':'3', 'sender':'Halim Dwivedi', 'mailid':'halimDwivedi@domain.com', 'date':'Yesterday Feb 8 18:46', 'subject':'Technical Issues','text':'Hi Dmitry,<br>This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.<br> Kindly bear with problem and could you please let me know the future course of action. <br><br>Halim Dwivedi', 'additional':null})
	
    $scope.$on('$routeChangeSuccess', function () {
        if(angular.isDefined($routeParams.msgId)) $scope.selectedMailId = $routeParams.msgId;
    });
    
	$scope.calls = [];
	$scope.calls.push({'title':'Recorded on 2-5-2016 12:00:00','filepath':'audio/payment_voice/payment1.wav', 'filename':'payment1.wav'});
	$scope.calls.push({'title':'Recorded on 2-6-2016 12:00:00','filepath':'audio/payment_voice/payment2.wav', 'filename':'payment2.wav'});
	$scope.calls.push({'title':'Recorded on 2-6-2016 16:45:00','filepath':'audio/payment_voice/payment3.wav', 'filename':'payment3.wav'});
	
	$scope.analysedData = {};
	var tmpData = "text=Hi+Team%2C+%0A%0AI+know+the+times+are+difficult!+Our+sales+have+been+disappointing+for+the+past+three+quarters+for+our+data+analytics+product+suite.+We+have+a+competitive+data+analytics+product+suite+in+the+industry.+But+we+need+to+do+our+job+selling+it!+%0A%0AWe+need+to+acknowledge+and+fix+our+sales+challenges.+We+can%E2%80%99t+blame+the+economy+for+our+lack+of+execution!+We+are+missing+critical+sales+opportunities.+Our+product++is+in+no+way+inferior+to+the+competitor+products.+Our+clients+are+hungry+for+analytical+tools+to+improve+their+business+outcomes.+Economy+has+nothing+to+do+with+it.+In+fact%2C+it+is+in+times+such+as+this%2C+our+clients+want+to+get+the+insights+they+need+to+turn+their+businesses+around.+Let%E2%80%99s+buckle+up+and+execute.+%0A%0AIn+summary%2C+we+have+a+competitive+product%2C+and+a+hungry+market.+We+have+to+do+our+job+to+close+the+deals.%0A%0AJennifer+Baker%0ASales+Leader%2C+North-East+Geo%2C%0AData+Analytics+Inc."; 

	 $scope.getAnalysedData = function(message) {
		//var uiLoader = new UILoader($(".modal-body","#analyseModal"));
		//uiLoader.show();
		$scope.loader = true;
		$scope.loaderMessage = 'Analysing text...';
		toneAnalyserService.getToneAnalysedData('text='+message, function (code, data) {
			$scope.analysedData = data;
		//	console.log(data);
			google.charts.setOnLoadCallback(drawChart());
			//uiLoader.hide();
			var additionalArray = {};
			angular.forEach($scope.analysedData.children, function(toneData) {
                angular.forEach(toneData.children, function(innerData) {
                    additionalArray[innerData.name] = innerData.word_count;
                });
            });

           // console.log(additionalArray);
			if(angular.isDefined(additionalArray)){
				//angular.forEach($scope.emails, function(email) {
	               // if(email.msgId === msgId){
	                	$scope.additional = additionalArray;
	                //	$scope.selectedEmail = email;
	                //}
	          //  });
			}
			$scope.loader = false;
	    },function (code, data) {
			 $scope.showMessage('info',SERVER_FAILURE);
			 $scope.loader = false;
	    });
	 }
	 
	 $scope.getRecordingAnalysedData = function(filename) {
         var transcript = '';
         $scope.loader = true;
         $scope.loaderMessage = 'Analysing Voice';
          $timeout(function(){
                	
                }, 500);
		//console.log(filename);
		//var uiLoader = new UILoader($(".modal-body","#recordingAnalyseModal"));
		
		//uiLoader.show();
            toneAnalyserService.getAudioAnalysis(filename,function (code, data) {
                         	$scope.loaderMessage = 'Speech Converted <br /> Analysing Tone';
                        angular.forEach(data.results ,function(record, rkey) {
                            if(record.final==true){
                                transcript = record.alternatives[0].transcript
                               }
                        });

                $timeout(function(){
                	$scope.getAnalysedData(transcript)
                	
                }, 300);
                //$scope.getAnalysedData(transcript);
                // uiLoader.hide();
                         },
                         function (code, data) {
                    $scope.loader = false;
                         //uiLoader.hide();
            });
		/*$http.get(jsonpath).success(function(data, status, headers, config) {
             uiLoader.hide();
         
             // call to get display Analysed Data details..
         })
         .error(function(data, status, headers, config) {
             console.log(status);
             uiLoader.hide();
         });*/
	 }

	$scope.AnalyseAll = function(){
		var transcript = '';
		$scope.socialQuotient = false;
		$scope.loader = true;
		$scope.analysisCummulative = [];
		angular.forEach($scope.calls, function(call) {
	        toneAnalyserService.getAudioAnalysis(call.filename,function (code, data) {
	        			
                        angular.forEach(data.results ,function(record, rkey) {
                            if(record.final==true){
                                transcript = record.alternatives[0].transcript
                               }
                        });
                
                		toneAnalyserService.getToneAnalysedData('text='+transcript, function (code, data) {	
							$scope.analysisCummulative.push(data);},function (code, data) {});
               
                         },
                         function (code, data) {
            });      
          });
          
          angular.forEach($scope.emails, function(email) {
	       
	            		toneAnalyserService.getToneAnalysedData('text='+email.text, function (code, data) {
							$scope.analysisCummulative.push(data);
							
							},function (code, data) {});  
							            
                         
        	});
        	
        	
		$timeout(function(){
                	//console.log(JSON.stringify($scope.analysisCummulative));                	
                
               
              var analysisCummulative =  [{"scorecard":"email","children":[{"name":"Emotion Tone","id":"emotion_tone","children":[{"name":"Cheerfulness","id":"Cheerfulness","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Negative","id":"Negative","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Anger","id":"Anger","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]}],"word_count":0},{"name":"Writing Tone","id":"writing_tone","children":[{"name":"Analytical","id":"Analytical","word_count":1,"normalized_score":0.07778630311536859,"raw_score":0.00445945945945946,"linguistic_evidence":[{"evidence_score":0.07778630311536859,"word_count":1,"correlation":"positive","words":["that"]}]},{"name":"Confident","id":"Confident","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Tentative","id":"Tentative","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]}],"word_count":1},{"name":"Social Tone","id":"social_tone","children":[{"name":"Openness","id":"Openness_Big5","word_count":60,"normalized_score":0.05113179596645318,"raw_score":-0.08549019607843136,"linguistic_evidence":[{"evidence_score":0.28959158220454034,"word_count":19,"correlation":"positive","words":["the","with","as","in","and","by","of","for","to","an"]},{"evidence_score":0.06418528295444104,"word_count":41,"correlation":"negative","words":["but","reason","hi","request","had","do","your","approved","not","are","now","get","me","should","have","saying","they","you","given","approval","again","one","i","is","my","am","rejection","what","cannot"]}]},{"name":"Conscientiousness","id":"Conscientiousness_Big5","word_count":25,"normalized_score":0.0072006514187942594,"raw_score":-0.029019607843137254,"linguistic_evidence":[{"evidence_score":0.11444776119402984,"word_count":7,"correlation":"positive","words":["the","now","again","an"]},{"evidence_score":0.018025832043343674,"word_count":18,"correlation":"negative","words":["but","all","reason","or","approval","rejection","that","not","approved","what","should","cannot","saying"]}]},{"name":"Agreeableness","id":"Agreeableness_Big5","word_count":34,"normalized_score":0.4004298937452077,"raw_score":0.04637254901960784,"linguistic_evidence":[{"evidence_score":0.5521158310347751,"word_count":26,"correlation":"positive","words":["given","hi","request","in","again","one","i","had","your","my","with","and","now","me","saying","they","you"]},{"evidence_score":0.00900612423447069,"word_count":8,"correlation":"negative","words":["saving","reason","bank","rejection"]}]}],"word_count":68}],"replaceable_words":["but","all","reason","given","request","approval","again","do","am","rejection","saving","bank","approved","are","now","get","have","saying"]},{"scorecard":"email","children":[{"name":"Emotion Tone","id":"emotion_tone","children":[{"name":"Cheerfulness","id":"Cheerfulness","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Negative","id":"Negative","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Anger","id":"Anger","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]}],"word_count":0},{"name":"Writing Tone","id":"writing_tone","children":[{"name":"Analytical","id":"Analytical","word_count":1,"normalized_score":0.5000000000000001,"raw_score":0.012222222222222223,"linguistic_evidence":[{"evidence_score":0.5000000000000001,"word_count":1,"correlation":"positive","words":["know"]}]},{"name":"Confident","id":"Confident","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]},{"name":"Tentative","id":"Tentative","word_count":0,"normalized_score":0,"raw_score":0,"linguistic_evidence":[{"evidence_score":0,"word_count":0,"correlation":"positive","words":[]}]}],"word_count":1},{"name":"Social Tone","id":"social_tone","children":[{"name":"Openness","id":"Openness_Big5","word_count":34,"normalized_score":0.4058545364620543,"raw_score":-0.041290322580645154,"linguistic_evidence":[{"evidence_score":0.5581302433784996,"word_count":15,"correlation":"positive","words":["the","with","as","and","of","for","this","to"]},{"evidence_score":0.38589818512008023,"word_count":19,"correlation":"negative","words":["wouldn't","hi","no","inform","could","february","i","02882111","is","do","required","month","future","me","525","know","action","you"]}]},{"name":"Conscientiousness","id":"Conscientiousness_Big5","word_count":16,"normalized_score":0.23062618595825432,"raw_score":-0.012096774193548388,"linguistic_evidence":[{"evidence_score":0.5740942928039701,"word_count":8,"correlation":"positive","words":["the","month","future","february"]},{"evidence_score":0.17829873165965918,"word_count":8,"correlation":"negative","words":["wouldn't","no","that","inform","could","than","know","required"]}]},{"name":"Agreeableness","id":"Agreeableness_Big5","word_count":16,"normalized_score":0.35035606652528184,"raw_score":0.044838709677419354,"linguistic_evidence":[{"evidence_score":0.2770227201355467,"word_count":16,"correlation":"positive","words":["hi","inform","february","this","i","02882111","required","with","month","and","future","me","525","action","you"]},{"evidence_score":0.92,"word_count":0,"correlation":"negative","words":[]}]}],"word_count":36}],"replaceable_words":["inform","month","future","know","action","do","required"]}];
              var postiveArray = ['Cheerfulness','Confident','Openness_Big5','Agreeableness_Big5'];
              var negativeArray = ['Negative','Anger','Tentative'];
              var midArray = ['Conscientiousness_Big5','Analytical'];
              var pt = 0;
              var nt = 0;
              var mid = 0;
              angular.forEach(analysisCummulative , function(analysis){
              	angular.forEach(analysis['children'] , function(individual){
              		angular.forEach(individual['children'] , function(tone){
              			
              		if(postiveArray.indexOf(tone.id) > -1){
              			pt = pt + tone.normalized_score;
              		}else if(negativeArray.indexOf(tone.id) > -1){
              			nt = nt + tone.normalized_score;
              		}else if(midArray.indexOf(tone.id) > -1){
              			mid = mid + tone.normalized_score;
              		}
              		});
              	});
              });
              var avgPt = (pt/4 + mid/4)*10;
              var avgNt = (nt/3 + mid/4)*10;
              
              var negativeValue = 10-avgNt;
              var positiveValue = avgPt;
              var eq = 0
              var sq = 0;
              if(negativeValue > positiveValue){
              	eq = (negativeValue - positiveValue) / 2;
              	sq = positiveValue + eq;
              }else if(positiveValue > negativeValue){
              	eq = (positiveValue - negativeValue)/2; 
              	sq = negativeValue + eq;            	
              }
              
              $scope.loader = false;
              $scope.socialQuotient = Math.round(sq * 100) / 100;
              }, 1000);
	};
	 function drawChart() {
	 	var toneData = $scope.analysedData;
	 	//console.log(toneData);
            var data = google.visualization.arrayToDataTable([
              ['Tone', 'Count word'],
              [toneData.children[0].name, toneData.children[0].word_count],
              [toneData.children[1].name, toneData.children[1].word_count],
              [toneData.children[2].name, toneData.children[2].word_count]
            ]);
			$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
		    $scope.data = [300, 500, 100];
            var options = {
              title: 'Analysed Tone Chart',
              is3D: true,
              width: 800,
              height: 450
            };
			
			
            var chart = new google.visualization.PieChart(document.getElementById('analysePieChart'));
            chart.draw(data, options);
     }
	 
	 $scope.trustHtml = function(htmlString) {
		 
		 return $sce.trustAsHtml(htmlString);
	 }
}]);
	
	

	

	
