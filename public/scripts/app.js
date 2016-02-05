var app = angular.module('loansapp', ['ngRoute','chart.js']).config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'scripts/views/Dashboard.html',
    controller: 'DashboardController'
  }).when('/complaints', {
    templateUrl: 'scripts/views/Complaints.html',
    controller: 'DashboardController'
  })
  .when('/email/read', {
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



});

