(function(angular) { 'use strict';
    
var authModule = angular.module('ceradAuthModule', []);

authModule.config(function($routeProvider) {
  $routeProvider.
    when('/login', { 
      templateUrl: 'modules/auth/login.html', 
      controller:  'CeradUserLoginController as login'});
});

var ceradAuthInterceptor = function(ceradAuthManager) 
{ 
  return {
    request: function (config) 
    {
      config.headers = config.headers || {};
      if (ceradAuthManager.authToken) 
      {
        config.headers.Authorization = '' + ceradAuthManager.authToken;
      }
      return config;
    }
  };
};
authModule.factory('ceradAuthInterceptor',ceradAuthInterceptor);

/* ========================
 * How much of this can be moved to the authManager?
 */
var ceradUserLoginController = function($window,$http,ceradApiPrefix,ceradAuthManager) 
{ 
  var self = this;
    
  var oauthWindow;

  self.oauthConnect = function(provider)
  {
    var url = ceradApiPrefix + '/oauth/tokens?provider=' + provider;
    oauthWindow = $window.open(url,'_blank', 'height=600, width=600, top=100, left=300, modal=yes');
    oauthWindow.focus();
  };
  $window.oauthCallback = function(oauthToken) 
  {
    oauthWindow.close();
    oauthWindow = null;
    ceradAuthManager.oauthToken = oauthToken;    
    self.oauthSubmit();
  };
  self.oauthSubmit = function()
  {
    var oauthToken = ceradAuthManager.oauthToken;
      
    var url = ceradApiPrefix + '/auth/tokens';
    var payload = { oauth_token: oauthToken };
      
    $http.post(url,payload).success(authTokenSuccess);

    // TODO: Handle unauthenticated stuff
  };
  // Form login
  self.userLoginInfo = ceradAuthManager.userLoginInfo;
    
  self.loginSubmit = function()
  {
    var url = ceradApiPrefix + '/auth/tokens';
      
    var payload = 
    { username: self.userLoginInfo.username, 
      password: self.userLoginInfo.password };
      
    $http.post(url,payload).success(authTokenSuccess);
  };
  var authTokenSuccess = function(data)
  {
    var userData = angular.fromJson(data);
  /*console.log('User  ' + userData.username);
    console.log('Roles ' + userData.roles);
    console.log('Token ' + userData.auth_token);*/
        
    ceradAuthManager.authToken = userData.auth_token;
        
    delete userData.auth_token;
        
    ceradAuthManager.authUser = userData;
      
    if (self.userLoginInfo.rememberMe) ceradAuthManager.userLoginInfo = self.userLoginInfo;
    else                               ceradAuthManager.userLoginInfo = null;
  };
};
authModule.controller('CeradUserLoginController',ceradUserLoginController);

var ceradUserInfoController = function($scope,$location,ceradAuthManager) 
{ 
  var self = this;
  
  self.user = ceradAuthManager.authUser;
  
  self.logout = function()
  {
    ceradAuthManager.logout(); // Tell server?
  };
  self.login = function()
  {
    $location.url('/login');
  };
  $scope.$on('userChanged',function() // Destroy?
  {
    self.user = ceradAuthManager.authUser;
  });
};
authModule.controller('CeradUserInfoController',ceradUserInfoController);

/* ============================================================
 * Directive for displaying user information panel
 */
var ceradUserInfo = function() 
{ 
  var obj =
  {
    restrict: 'E',
    scope: {},
    controller:   'CeradUserInfoController',
    controllerAs: 'userInfo',
    templateUrl:  'modules/auth/user-info.html',
    link: function(scope, element, attrs)
    {
      // console.log('ceradUserInfo');
    }
  };
  return obj;
};
authModule.directive('ceradUserInfo',ceradUserInfo);

var ceradUserLogin = function() 
{ 
  return {
    restrict: 'E',
    scope: {},
    controller:   'CeradUserLoginController',
    controllerAs: 'login',
    templateUrl:  'modules/auth/user-login-form.html',
    link: function(scope, element, attrs)
    {
      // console.log('ceradUserInfo');
    }
  };
};
authModule.directive('ceradUserLogin',ceradUserLogin);

// Want to be able to configure this for different storage
/* So far there is nothing to actually manage
 * This is actualy an authStorage service
 */
authModule.factory('ceradAuthManager',function($rootScope,$sessionStorage)
{
  var storage = $sessionStorage;
  
  var manager = 
  {
    set oauthToken(token) { storage.oauthToken = token; },
    get oauthToken() { return storage.oauthToken; },
      
    set authToken(token) { storage.authToken = token; },
    get authToken() { return storage.authToken; },
      
    set authUser(user) 
    { 
      storage.authUser = user;
      $rootScope.$broadcast('userChanged');
    },
    get authUser() { return storage.authUser; },
    
    set userLoginInfo(info) 
    { 
      storage.userLoginInfo = info;
    },
    get userLoginInfo() 
    {
      var info = storage.userLoginInfo;
      if (angular.isObject(info)) return info;
      return { username: 'sra', password: null, rememberMe : false };
    },

    logout: function()
    {
      delete storage.oauthToken;
      delete storage.authToken;
      delete storage.authUser;
      $rootScope.$broadcast('userChanged');
    }
  };
  return manager;
});
})(angular);
