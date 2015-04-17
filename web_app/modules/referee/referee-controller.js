(function(angular) { 'use strict';
    
var refereeModule = angular.module('ceradRefereeControllerModule',[]);

refereeModule.config(function($routeProvider) 
{
  $routeProvider.
    when('/referees', { 
      templateUrl: 'modules/referee/referee-list.html',
      controller:  'RefereeListController as refereeList'}).
    when('/referees/:id/show', {
      templateUrl: 'modules/referee/referee-show.html',
      controller:  'RefereeShowController as refereeShow'}).
    when('/referees/:id/update', {
      templateUrl: 'modules/referee/referee-update.html',
      controller:  'RefereeUpdateController as refereeUpdate'}).
    when('/referees/insert', {
      templateUrl: 'modules/referee/referee-insert.html',
      controller:  'RefereeInsertController as refereeInsert'});
});

refereeModule.controller('RefereeListController',function($scope,ceradRefereeRepository) 
{
  var vm = this;
    
  vm.referees = [];
  
  var findAll = function()
  {
    ceradRefereeRepository.findAll().then(function(items)
    {
      vm.referees = items;
    });  
  };
  findAll();
  /*
  refereeRepository.findAll().then(function(items)
  {
    vm.referees = items;
  });*/
  var userChanged = function()
  {
    vm.referees = [];
    ceradRefereeRepository.reset();
    findAll();
  };
  $scope.$on('userChanged',userChanged);
});
refereeModule.controller('RefereeShowController', function($routeParams,ceradRefereeRepository) 
{
  var vm = this;
    
  vm.referee = {};
    
  var findOneThen = function(item)
  {
    vm.referee = item;
  };
  ceradRefereeRepository.findOne($routeParams.id).then(findOneThen);
});
refereeModule.controller('RefereeUpdateController', function($routeParams,ceradRefereeRepository) 
{ 
  var vm = this;
  
  vm.referee = {};
    
  ceradRefereeRepository.findOne($routeParams.id).then(function(item)
  {
    vm.referee = item;
  });
    
  vm.update = function() 
  {
    ceradRefereeRepository.update(vm.referee).then(function(item)
    {
      // Do this then the cache becomes invalid.  Maybe a replace?
      //vm.referee = item;
    });
  };
});
refereeModule.controller('RefereeInsertController',function(ceradRefereeRepository) 
{
  var vm = this;
    
  vm.referee = ceradRefereeRepository.create();
    
  this.insert = function() {
    ceradRefereeRepository.insert(vm.referee).then(function(item)
    {
      vm.referee = item;
    });
  };
});

})(angular);