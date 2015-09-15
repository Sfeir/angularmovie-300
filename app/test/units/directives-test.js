'use strict';

describe('directorValidator', function() {
  var scope;

  beforeEach(module('angularMovieUI'));

  beforeEach(inject(function($injector, $rootScope) {
    scope = $rootScope.$new();
  }));

  it('should be valid for a good director', inject(function($compile) {
    scope.director = "Kikoo Plop";
    var element = angular.element('<input type="text" ng-model="director" director-validator>');
    $compile(element)(scope);
    scope.$apply();

    expect(element[0].classList.contains('ng-valid-director')).toBeTruthy();
    expect(element[0].classList.contains('ng-invalid-director')).toBeFalsy();
  }));

  it('should not be valid for a weird director', inject(function($compile) {
    scope.director = "qwertyuiop";
    var element = angular.element('<input type="text" ng-model="director" director-validator>');
    $compile(element)(scope);
    scope.$apply();

    expect(element[0].classList.contains('ng-valid-director')).toBeFalsy();
    expect(element[0].classList.contains('ng-invalid-director')).toBeTruthy();
  }));
});
