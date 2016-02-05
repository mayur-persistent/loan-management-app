var app = angular.module('loansapp', ['ngRoute']).config(function($routeProvider, $locationProvider) {
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
    controller: 'DashboardController'
  })


});

