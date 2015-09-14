(function() {
  'use strict';

  angular.module('app.interceptors')
    .factory('csrfInterceptorService', ['$log', '$cookies', csrfInterceptorService]);

  function csrfInterceptorService($log, $cookies) {
    return {
      request: function (config) {
        if ($cookies.get('SfeirToken')) {
          config.headers['X-XSRF-TOKEN'] = $cookies.get('SfeirToken');
        }
        return config;
      }
    };
  }
})();
