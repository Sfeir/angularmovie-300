(function() {
  'use strict';

  var errInterceptorConfig = {
    ERR_EVENT        : 'event:errEvent',
    ERR_REPLAY_EVENT : 'event:errReplayEvent'
  };

  angular.module('app.interceptors')
    .constant('errInterceptorConfig', errInterceptorConfig);
})();
