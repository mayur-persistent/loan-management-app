'use strict';

/**
 * The DashboardController controller manages the reports.
 *
 * @class DashboardController
 * @constructor
 * @param $scope {angular}
 */
app.controller('DashboardController', ['$scope', '$rootScope','customerService','$location','toneAnalyserService'
       	                           	,function($scope, $rootScope , customerService,$location,toneAnalyserService) {
		customerService.getCustomerList(function (code, data) {
			$scope.customerList = data.slice(1, 10);
			 if($(".datatable").length > 0){                
                $(".datatable").dataTable();
                $(".datatable").on('page.dt',function () {
                    onresize(100);
                });
            }
            
            
			var loanTypes = {};
			var creditScores = {};
			angular.forEach(data, function(record, rkey) {
				angular.forEach(record, function(value, key) {
					/*get users by prodcut */
					if(key=='Loan-productname'){
						if(!loanTypes[value]){
							loanTypes[value] = [];
						}
						loanTypes[value].push(record);
					}
					
					/*get users by Credit Score  */
					if(key=='Creditscore'){
						var creditScore = parseInt(value);
						var scoreType = '';
						if (creditScore >= 750) {
						    scoreType = 'excellent';
						} else if (creditScore >= 700 && creditScore <= 749) {
						    scoreType = 'good';
						} else if (creditScore >= 650 && creditScore <= 699) {
						    scoreType = 'fair';
						}else if (creditScore >= 600 && creditScore <= 649) {
						    scoreType = 'poor';
						}else if (creditScore < 600) {
						    scoreType = 'bad';
						}
						if(!creditScores[scoreType]){
							creditScores[scoreType] = [];
						}
						creditScores[scoreType].push(record);
					}
					
				});
			});
		
			
			
	$scope.labelsScores = ["Excellent", "Good", "Fair", "Poor", "Bad"];
    $scope.dataScores = [creditScores['excellent'].length, creditScores['good'].length, creditScores['fair'].length, creditScores['poor'].length, creditScores['bad'].length];
    
    
    
    
	$scope.labels = ["Personal Loans", "Home Loans", "Auto Loans" , "Total Customers"];
  	$scope.data = [2146, 1424, 1412 , 7000];
  	$scope.type = 'PolarArea';

    $scope.toggle = function () {
      $scope.type = $scope.type === 'PolarArea' ?
        'Pie' : 'PolarArea';
    };
    
    },function (code, data) {
		 $scope.showMessage('info',SERVER_FAILURE);
    });
    
    
   
	$scope.onClick = function (points, evt) {
    	$location.path('customerList')
    };
    $scope.loadProfile = function (id) {
    	$location.path('customerDetail/'+id)
    };

    $scope.init = function(){
    	   toneAnalyserService.getTokenForSpeech(function (code, data) {
    	   	console.log(data);
    	   	if (sessionStorage.token) {
		    	sessionStorage.token = data;
			}
    	   	
    	   },function (code, data) {
		 
    }) 	
    }
    $scope.init();

}]);
	
	

	

	
