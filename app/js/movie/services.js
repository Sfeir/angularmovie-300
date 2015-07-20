"use strict";

angular.module('angularMovieCore').provider("Movie", function() {
  var _this   = this,
      API_URI = '';

  _this.setURI = function(URI) {
    API_URI = URI;
  };

  _this.$get = ['$http', function($http) {
    return {
      fetch    : fetch,
      create   : create,
      remove   : remove,
      fetchOne : fetchOne,
      update   : update
    };

    function fetch() {
      console.log(API_URI);
      return $http.get(API_URI);
    }

    function create(movie) {
      return $http.post(API_URI, movie);
    }

    function remove(id) {
      return $http.delete(API_URI + '/' + id);
    }

    function fetchOne(id) {
      return $http.get(API_URI + '/' + id);
    }

    function update(movie) {
      return $http.put(API_URI, movie);
    }
  }];
});
