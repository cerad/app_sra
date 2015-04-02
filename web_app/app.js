(function(angular) { 'use strict';

var appModule = angular.module('CeradSraApp', ['ngRoute','ngStorage',
//'appConfigModule',
//'ceradAuthModule',
  'CeradRefereeModule'
]);

appModule.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    otherwise({ redirectTo: '/referees'});
}]);
appModule.config(['$httpProvider', function ($httpProvider) {
//$httpProvider.interceptors.push('ceradAuthInterceptor');
}]);

// Create empty modules
angular.module('CeradRefereeModule',[]);

})(angular);
