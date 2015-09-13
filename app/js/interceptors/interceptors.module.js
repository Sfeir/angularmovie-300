(function() {
  'use strict';

  angular.module('app.interceptors', [])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('errInterceptorService');
    }]);
})();
