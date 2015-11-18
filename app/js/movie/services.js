"use strict";

angular.module('angularMovieCore').provider("Movie", function() {
  var _this   = this,
      API_URI = '';

  _this.setURI = function(URI) {
    API_URI = URI;
  };

  _this.$get = ['$http', '$q', function($http, $q) {
    var HTTP_GET_CONFIG;

    HTTP_GET_CONFIG = {
      transformResponse : function(response) {
        console.info('Response transformed');
        return angular.fromJson(response).data ? angular.fromJson(response).data : angular.fromJson(response);
      }
    };

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
      return $http.get(API_URI, HTTP_GET_CONFIG);
    }

    function search(title) {
      return $http.get(API_URI + '/search?title=' + title, HTTP_GET_CONFIG);
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
      return $http.post(API_URI, movie, HTTP_GET_CONFIG);
    }

    function remove(id) {
      return $http.delete(API_URI + '/' + id, HTTP_GET_CONFIG);
    }

    function fetchOne(id) {
      return $http.get(API_URI + '/' + id, HTTP_GET_CONFIG);
    }

    function update(movie) {
      return $http.put(API_URI, movie, HTTP_GET_CONFIG);
    }
  }];
});
