'use strict';

describe('directiveRating', function() {
  var scope;

  beforeEach(module('angularMovieUI'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('stars', inject(function($compile) {
    scope.rate  = "3";
    var element = angular.element('<rating ng-model="rate" readonly="true" max="5"><i class="fa fa-star"></i></rating>');
    $compile(element)(scope);
    scope.$apply();
    expect(element.find('.fa-star').length).toBe(5);
    expect(element.find('.filled').length).toBe(3);
  }));

  it('update value', inject(function($compile) {
    scope.rate  = "3";
    var element = angular.element('<rating ng-model="rate" readonly="false" max="5"><i class="fa fa-star"></i></rating>');
    $compile(element)(scope);
    scope.$apply();
    expect(element.find('.filled').length).toBe(3);

    element.isolateScope().rate(3);
    scope.$apply();

    expect(element.find('.filled').length).toBe(4);
  }));


  it('rate', inject(function($compile) {
    scope.rate  = "3";
    var element = angular.element('<rating ng-model="rate" readonly="true"><i class="fa fa-star"></i></rating>');
    $compile(element)(scope);
    scope.$apply();

    element.isolateScope().rate(3);

    expect(element.isolateScope().ratingValue).toBe('3');
  }));
});