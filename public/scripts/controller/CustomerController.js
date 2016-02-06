'use strict';

/**
 * The CustomerController controller manages the customer.
 *
 * @class CustomerController
 * @constructor
 * @param $scope {angular}
 */
app.controller('CustomerController', ['$scope', '$rootScope','customerService','$location','toneAnalyserService'
       	                           	,function($scope, $rootScope , customerService,$location,toneAnalyserService) {
    
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

	$scope.emails = [];
	$scope.emails.push({'subject':'Re : Delay in payment','text':'Hi John,This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.Kindly bear with problem and could you please let me know the future course of action.Jennifer Baker', 'additional':true})
	$scope.emails.push({'subject':'Personal Loan Enquiry','text':'Hi John,</br>I am an account holder in your bank with my saving/ current number 003-117-454646. I had applied for personal loan loan in your esteemed bank. But the loan is not approved for one or another reason. I have fulfilled all conditions as demanded by your bank staff but now they are saying that the loan cannot be approved for the reason (provide the reason of rejection as given by staff).<br>I request you to consider my application again and guide me that what should I do to get approval.<br>Thanking you.<br>Sally Ranger'})
	$scope.emails.push({'subject':'Technical Issues','text':'Hi John,This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.Kindly bear with problem and could you please let me know the future course of action.Jennifer Baker'})
	
	$scope.calls = [];
	$scope.calls.push({'title':'Recording 2-5-2016 12:00:00','filepath':''});
	$scope.calls.push({'title':'Recording 2-5-2016 12:00:00','filepath':''});
	
	
	
	$scope.analysedData = {};
	var tmpData = "text=Hi+Team%2C+%0A%0AI+know+the+times+are+difficult!+Our+sales+have+been+disappointing+for+the+past+three+quarters+for+our+data+analytics+product+suite.+We+have+a+competitive+data+analytics+product+suite+in+the+industry.+But+we+need+to+do+our+job+selling+it!+%0A%0AWe+need+to+acknowledge+and+fix+our+sales+challenges.+We+can%E2%80%99t+blame+the+economy+for+our+lack+of+execution!+We+are+missing+critical+sales+opportunities.+Our+product++is+in+no+way+inferior+to+the+competitor+products.+Our+clients+are+hungry+for+analytical+tools+to+improve+their+business+outcomes.+Economy+has+nothing+to+do+with+it.+In+fact%2C+it+is+in+times+such+as+this%2C+our+clients+want+to+get+the+insights+they+need+to+turn+their+businesses+around.+Let%E2%80%99s+buckle+up+and+execute.+%0A%0AIn+summary%2C+we+have+a+competitive+product%2C+and+a+hungry+market.+We+have+to+do+our+job+to+close+the+deals.%0A%0AJennifer+Baker%0ASales+Leader%2C+North-East+Geo%2C%0AData+Analytics+Inc.";
	 

	 $scope.getAnalysedData = function() {
		
		toneAnalyserService.getToneAnalysedData(tmpData, function (code, data) {
			$scope.analysedData = data;
            google.charts.setOnLoadCallback(drawChart());
	    },function (code, data) {
			 $scope.showMessage('info',SERVER_FAILURE);
	    });
    
	 	//$scope.analysedData = tempAnalysedData;
	 	//console.log(tempAnalysedData);

	 	/*toneAnalyserService.getToneAnalysedData(tmpData).then(
            function(res) {
                console.log(res);
                $scope.analysedData = res.data;
                google.charts.setOnLoadCallback(drawChart());
            },
            function(res) {
                console.error(res);
            }
        );*/
	 }

	 function drawChart() {
	 	var toneData = $scope.analysedData;

            var data = google.visualization.arrayToDataTable([
              ['Tone', 'Count word'],
              [toneData.children[0].name, toneData.children[0].word_count],
              [toneData.children[1].name, toneData.children[1].word_count],
              [toneData.children[2].name, toneData.children[2].word_count]
            ]);

            var options = {
              title: 'Analysed Tone Chart',
              is3D: true,
              width: 800,
              height: 450
            };

            var chart = new google.visualization.PieChart(document.getElementById('analysePieChart'));
            chart.draw(data, options);
     }
}]);
	
	

	

	
