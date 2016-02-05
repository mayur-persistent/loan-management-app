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
