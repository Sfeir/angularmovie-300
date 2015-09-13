"use strict";

angular.module('angularMovieCore').provider("Auth", function() {
  var _this    = this,
      AUTH_URI = '';

  _this.setURI = function(URI) {
    AUTH_URI = URI;
  };

  _this.$get = ['$http', function($http) {
    return {
      getCredentials : getCredentials,
      logout         : logout,
      login          : login
    };

    function getCredentials() {
      return $http.get(AUTH_URI);
    }

    function logout() {
      return $http.get(AUTH_URI + '/logout');
    }

    function login(datas) {
      return $http.post(AUTH_URI, datas);
    }
  }];
});
