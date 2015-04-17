(function(angular) { 'use strict';
    
var refereeModule = angular.module('ceradRefereeModelModule',[]);

var Referee = function(params)
{
  this.id         = null;
  this.ussf_id    = null;
  this.name_first = null;
  this.name_last  = null;
  this.email_ussf = null;

  this.gender = null;
  this.dob    = null;
  
  this.reg_year   = null;
  this.reg_state  = null;
  this.reg_status = null;
  this.district   = null;
  
  if (!params) return;
  
  var thisObj = this;
  
  Object.keys(this).forEach(function(key)
  {
    if (params.hasOwnProperty(key)) 
    {
      thisObj[key] = params[key];
    }
  });
};
// This need to here so we don't try adding the methods over and over
Object.defineProperty(Referee.prototype, 'name_full', 
{
  enumerable: false, // Default
  get: function() 
  {
    return this.name_first + ' ' + this.name_last;
  },
  set: function(name) 
  {
    var words = name.split(' ');
    this.name_first = words[0] || '';
    this.name_last  = words[1] || '';
  }
});

var RefereeRepository = function($http,$q,apiPrefix)
{
  var self = this;
  
  var resourceUrl = apiPrefix + '/referees';
  
  var promiseAll = null; // This is the query cache
  
  this.reset = function() { promiseAll = null; }
  
  this.findAll = function() 
  { 
    return promiseAll ? promiseAll : self.loadAll();
  };
  this.loadAll = function()
  {   
    return promiseAll = $http.get(resourceUrl).then(function(response)
    {
      var data = angular.fromJson(response.data);
      var itemsx = [];
      data.forEach(function(item)
      {
        itemsx.push(new Referee(item));
      });
      return itemsx;
    },function() //($response)
    {
      //console.log('Error response');
      return [];
    });
  };
  this.loadOne = function(id)
  { 
    // Return the promise
    return $http.get(resourceUrl + '/' + id).then(function(response)
    {
      var data = angular.fromJson(response.data);
      return new Referee(data);
    });
  };
  this.findOne = function(id)
  {
    // TODO: The promise thing is not working
    if (!promiseAll || true) return self.loadOne(id);
    
    // Wait till all is available
    var deferred = $q.defer();
    
    promiseAll.then(function(items)
    {
      var itemx = null;
      items.every(function(item) 
      {
        if (item.id === id) 
        {
          itemx = item; 
          return false;
        }
        return true;
      });
      
      // In general, this should not happen
      if (!itemx) return self.loadOne(id); // Be nice to add to promiseAll
    
      // Kept the promise
      deferred.resolve(itemx);
    });
    return deferred.promise;
  };
  this.update = function(item)
  {
    // Return the promise
    return $http.put(resourceUrl + '/' + item.id,item).then(function(response)
    {
      var data = angular.fromJson(response.data);
      return new Referee(data);
    });
  };
  this.insert = function(item)
  {
    return $http.post(resourceUrl,item).then(function(response)
    {
      var data = angular.fromJson(response.data);
      return new Referee(data);
    });
  };
  this.create = function()
  {
    var referee = new Referee();
    delete referee.id;
    return referee;
  };
};
refereeModule.factory('CeradRefereeRepository',
  function($http,$q,ceradApiPrefix)
  {
    var refereeRepository = new RefereeRepository($http,$q,ceradApiPrefix);
    
  //refereeRepository.loadAll();
    
    return refereeRepository;
});

})(angular);