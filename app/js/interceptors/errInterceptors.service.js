(function() {
  'use strict';

  angular.module('app.interceptors')
    .factory('errInterceptorService', ['$rootScope', '$q', '$log', 'errInterceptorConfig', errInterceptorService]);

  function errInterceptorService($rootScope,
                                 $q,
                                 $log,
                                 errInterceptorConfig) {

    return {
      responseError : function(rejection) {
        if (rejection.status >= 400) {
          $log.error(rejection.status + ' responded');
          $rootScope.$broadcast(errInterceptorConfig.ERR_EVENT, rejection);
        }
        return $q.reject(rejection);
      }
    };
  }
})();
