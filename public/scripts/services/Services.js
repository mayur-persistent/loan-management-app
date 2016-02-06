app.factory('configService', function () {
    return new Configuration();
});

app.factory('restServiceProxy', function (configService, $http) {
    return new RestServiceProxy(configService, $http);
});

app.factory('customerService', function (configService, restServiceProxy, $http) {
    if (configService.ENV === "LOCAL") {
        return new CustomerJsService();
    } else {
        return new CustomerRestService(configService, restServiceProxy , $http);
    }
});

app.factory('productService', function (configService, restServiceProxy, $http) {
    if (configService.ENV === "LOCAL") {
        return new ProductJsService();
    } else {
        return new ProductRestService(configService, restServiceProxy , $http);
    }
});
app.factory('toneAnalyserService', function (configService, restServiceProxy, $http) {
    if (configService.ENV === "LOCAL") {
        return new ToneRestService();
    } else {
        return new ToneRestService(configService, restServiceProxy , $http);
    }
});

app.factory('UILoader', function() {
	
   function UILoader(dom) {
        this.domElement = null;
        this.loader = null;
        this.domElement = dom;
        this.loader = angular.element('<div class="overlay"><i class="fa fa-refresh fa-spin"></i></div>');
        (this.domElement).append(this.loader);
        (this.loader).hide();
    }

    UILoader.prototype = {
        show: function() {
            this.loader.show();
        },
        hide: function() {
            this.loader.hide();
        },
        destroy: function() {

        }
    }
    return UILoader;
})
