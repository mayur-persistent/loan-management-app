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
            
        }//End OWL Carousel
 uiOwlCarousel();
}]);
	
	

	

	
