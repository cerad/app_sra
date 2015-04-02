(function(angular) { 'use strict';

var appModule = angular.module('CeradSraApp', ['ngRoute','ngStorage',
  'CeradAuthModule',
  'CeradRefereeModule'
]);

appModule.config(['$locationProvider',function($locationProvider) 
{ // Need base uri I think
  //$locationProvider.html5Mode(true);
}]);
appModule.config(['$routeProvider',function($routeProvider) 
{
  $routeProvider.otherwise({ redirectTo: '/referees'});
}]);
appModule.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('CeradAuthInterceptor');
}]);

// Create empty modules
angular.module('CeradRefereeModule',[]);

})(angular);
