var app = angular.module('loansapp', ['ngRoute','chart.js','ngSanitize']).config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/views/Dashboard.html',
    controller: 'DashboardController'
  }).when('/complaints', {
    templateUrl: 'scripts/views/Complaints.html',
    controller: 'CustomerController'
  })
  .when('/email/read/:msgId', {
    templateUrl: 'scripts/views/ReadComplaints.html',
    controller: 'CustomerController'
  }).when('/customerList', {
    templateUrl: 'scripts/views/CustomerList.html',
    controller: 'DashboardController'
  }).when('/customerDetail/:id', {
    templateUrl: 'scripts/views/CustomerDetail.html',
    controller: 'CustomerController'
  }).when('/csList', {
    templateUrl: 'scripts/views/CSList.html',
    controller: 'CsController'
  }).when('/productList', {
    templateUrl: 'scripts/views/ProductList.html',
    controller: 'ProductController'
  })
  .when('/viewProfile', {
    templateUrl: 'scripts/views/profile.html',
    controller: 'ProfileController'
  })
  .when('/personality', {
    templateUrl: 'scripts/views/profile.html',
    controller: 'ProfileController'
  }).when('/analysis', {
    templateUrl: 'scripts/views/Analysis.html',
    controller: 'CustomerController'
  })

});

