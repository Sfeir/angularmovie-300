/**
 * Created by AshDevFr on 04/09/15.
 */

angular.module('angularMovieCore').controller('loginController', function($scope, $rootScope, $state, $modalInstance, $log, Auth) {
  "use strict";
  $scope.credentials = {};

  $scope.login = function(form) {
    if (form.$invalid) {
      $scope.formLogin.hasError = true;
      $scope.formLogin.error    = 'Formulaire non valide';
    } else {
      delete $scope.formLogin.error;
      delete $scope.formLogin.hasError;
      Auth.login($scope.credentials).then(function(response) {
        //$log.log('Successfully Logged!', response);
        $scope.formLogin = {};
        form.$setPristine();
        $modalInstance.close('success');
        $rootScope.$emit( 'LOGIN_SUCCESS' );
        $state.go($state.current, {}, {reload: true});
      }, function(e) {
        $log.error('Something wrong happened: ', e);
        $scope.formLogin.hasError = true;
        $scope.formLogin.error    = 'Erreur inconnue';
        if (e.status === 400) {
          $scope.formLogin.error = 'Informations de connexion non valides';
        } else if (e.status === 403) {
          $scope.formLogin.error = 'Utilisateur non autorisé';
        }
        $rootScope.$emit( 'LOGIN_ERROR' );
      });
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
    $state.go('home');
  };
});
