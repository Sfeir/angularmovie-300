(function() {
  'use strict';
  describe('movieAvailableValidator', function() {
    var scope, Movie;
    beforeEach(module('angularMovieUI'));

    beforeEach(function() {
      module(function($provide) {
        $provide.factory('Movie', function() {
          return {
            search : function() { }
          }
        });
      });
    });


    beforeEach(inject(function($rootScope, _Movie_) {
      scope = $rootScope.$new();
      Movie = _Movie_;
    }));


    it('should be valid for a good title', inject(function($compile, $q) {
      spyOn(Movie, 'search').and.returnValue($q.reject('Not found'));
      scope.title = "Avatar";

      var element = angular.element('<input ng-model="title" movie-available-validator />');
      $compile(element)(scope);
      scope.$apply();

      expect(element[0].classList
        .contains('ng-valid-title-available')).toBeTruthy();
      expect(element[0].classList
        .contains('ng-invalid-title-available')).toBeFalsy();
    }));


    it('should be not valid for a exiting title', inject(function($compile, $q) {
      spyOn(Movie, 'search').and.returnValue($q.resolve('exist'));
      scope.title = "Avatar";

      var element = angular.element('<input ng-model="title" movie-available-validator />');
      $compile(element)(scope);
      scope.$apply();

      expect(element[0].classList
        .contains('ng-valid-title-available')).toBeFalsy();
      expect(element[0].classList
        .contains('ng-invalid-title-available')).toBeTruthy();
    }));
  });
})();