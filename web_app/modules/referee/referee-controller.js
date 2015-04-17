(function(angular) { 'use strict';
    
var refereeModule = angular.module('ceradRefereeControllerModule',[]);

refereeModule.config(['$routeProvider',function($routeProvider) {
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
}]);

refereeModule.controller('RefereeListController', 
  ['$scope','CeradRefereeRepository',
  function($scope,refereeRepository) 
  {
    var vm = this;
    
    vm.referees = [];
  
    var findAll = function()
    {
      refereeRepository.findAll().then(function(items)
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
    $scope.$on('userChanged',function(op)
    {
      // Really need cache to be rethought
      vm.referees = [];
      refereeRepository.reset();
      findAll();
    });
  }
]);
refereeModule.controller('RefereeShowController', 
  ['$routeParams', 'CeradRefereeRepository',
  function($routeParams, refereeRepository) 
  {
    var vm = this;
    
    vm.referee = {};
    
    refereeRepository.findOne($routeParams.id).then(function(item)
    {
      vm.referee = item; // console.log(item);
    });
  }
]);
refereeModule.controller('RefereeUpdateController', 
  ['$routeParams', 'CeradRefereeRepository',
  function($routeParams, refereeRepository) 
  { 
    var vm = this;
    
    vm.referee = {};
    
    refereeRepository.findOne($routeParams.id).then(function(item)
    {
      vm.referee = item;
    });
    
    vm.update = function() {
      refereeRepository.update(vm.referee).then(function(item)
      {
        // Do this then the cache becomes invalid.  Maybe a replace?
        //vm.referee = item;
      });
    };
  }
]);
refereeModule.controller('RefereeInsertController', ['CeradRefereeRepository',
  function(refereeRepository) 
  {
    var vm = this;
    
    vm.referee = refereeRepository.create();
    
    this.insert = function() {
      refereeRepository.insert(vm.referee).then(function(item)
      {
        vm.referee = item;
      });
    };
  }
]);
})(angular);