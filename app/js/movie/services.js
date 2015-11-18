"use strict";

angular.module('angularMovieCore').provider("Movie", function() {
  var _this   = this,
      API_URI = '';

  _this.setURI = function(URI) {
    API_URI = URI;
  };

  _this.$get = ['$http', '$q', function($http, $q) {
    return {
      fetch     : fetch,
      search    : search,
      create    : create,
      remove    : remove,
      fetchOne  : fetchOne,
      update    : update,
      available : available
    };

    function fetch() {
      return $http.get(API_URI);
    }

    function search(title) {
      return $http.get(API_URI + '/search?title=' + title);
    }

    function available(title) {
      var d = $q.defer();
      search(title).then(function() {
        d.reject();
      }, function() {
        d.resolve();
      });
      return d.promise;
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
