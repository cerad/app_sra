(function(angular) { 'use strict';

var appModule = angular.module('ceradSraApp', 
[
  'ngRoute','ngStorage',
  'ceradAuthModule',
  'ceradRefereeModelModule','ceradRefereeControllerModule'
]);

appModule.config(['$locationProvider',function($locationProvider) 
{ // Need base uri I think
  // $locationProvider.html5Mode(true);
}]);
appModule.config(['$routeProvider',function($routeProvider) 
{
  $routeProvider.otherwise({ redirectTo: '/referees'});
}]);
appModule.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('ceradAuthInterceptor');
}]);

})(angular);
