'use strict';

/**
 * The ProductController controller manages the Products.
 *
 * @class CustomerController
 * @constructor
 * @param $scope {angular}
 */
app.controller('ProductController', ['$scope', '$rootScope','customerService','$location','toneAnalyserService'
                                     ,function($scope, $rootScope , customerService,$location,toneAnalyserService) {

	var uiOwlCarousel = function(){
		if($(".owl-carousel").length > 0){
			$(".owl-carousel").owlCarousel({mouseDrag: false, touchDrag: true, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false,autoPlay: true});
		}
	} //End OWL Carousel
	uiOwlCarousel();
	$scope.emails = [];
	$scope.emails.push({'msgId':'1', 'subject':'Re : Delay in payment','text':'Hi John,This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.<br>Kindly bear with problem and could you please let me know the future course of action. <br><br>Jennifer Baker', 'additional':{'Agreeableness':65, 'Analytical':8, 'Anger':2, 'Cheerfulness':2, 'Confident':1, 'Conscientiousness':42, 'Negative':4, 'Openness':113, 'Tentative':0}});
	$scope.emails.push({'msgId':'2', 'subject':'Personal Loan Enquiry','text':'Hi John,</br>I am an account holder in your bank with my saving/ current number 003-117-454646. <br> I had applied for personal loan loan in your esteemed bank. But the loan is not approved for one or another reason. <br>  I have fulfilled all conditions as demanded by your bank staff but now they are saying that the loan cannot be approved for the reason (provide the reason of rejection as given by staff).<br>I request you to consider my application again and guide me that what should I do to get approval.<br><br>Thanking you.<br>Sally Ranger', 'additional':{'Agreeableness':65, 'Analytical':8, 'Anger':2, 'Cheerfulness':2, 'Confident':1, 'Conscientiousness':42, 'Negative':4, 'Openness':113, 'Tentative':0}});
	$scope.emails.push({'msgId':'3', 'subject':'Technical Issues','text':'Hi John,This mail is to inform you that I wouldn\'t be able to do automatic EMI payment $525 for the Loan No: 02882111 for the month of February as the account balance will be  less than the required amount.<br> Kindly bear with problem and could you please let me know the future course of action. <br><br>Jennifer Baker', 'additional':{'Agreeableness':65, 'Analytical':8, 'Anger':2, 'Cheerfulness':2, 'Confident':1, 'Conscientiousness':42, 'Negative':4, 'Openness':113, 'Tentative':0}});

	$scope.calls = [];
	$scope.calls.push({'title':'Recorded on 2-5-2016 12:00:00','filepath':'audio/payment_voice/payment1.wav', 'fileJson':'/home/user1/git/loan-management-app/public/audio/payment_voice/payment1.json'});
	$scope.calls.push({'title':'Recorded on 2-6-2016 12:00:00','filepath':'audio/payment_voice/payment2.wav', 'fileJson':'/home/user1/git/loan-management-app/public/audio/payment_voice/payment2.json'});
	$scope.calls.push({'title':'Recorded on 2-6-2016 16:45:00','filepath':'audio/payment_voice/payment3.wav', 'fileJson':'/home/user1/git/loan-management-app/public/audio/payment_voice/payment3.json'});

	
	
}]);
	
	

	

	
