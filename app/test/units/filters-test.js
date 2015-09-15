'use strict';

describe('Filters', function() {

  beforeEach(module('angularMovieUI'));

  describe('poster filter', function() {
    var posterFilter;

    beforeEach(inject(function($filter){
      posterFilter = $filter('poster');
    }));

    it('should return the image url when there is one', function() {
      expect(posterFilter('/mylittlepony.png')).toEqual('/mylittlepony.png');
    });

    it('should return a default image url otherwise', function() {
      expect(posterFilter(null)).toEqual('img/no-poster.jpg');
      expect(posterFilter('')).toEqual('img/no-poster.jpg');
    });
  });

  describe('stars filter', function() {
    var starFilter;

    beforeEach(inject(function($filter){
      starFilter = $filter('stars');
    }));

    [1,2,3,4,5].forEach(function(value) {
      it('should work for a rating of' + value, function() {
        expect(starFilter(value).length).toEqual(value);
      });
    });

    [-1, 0, 6, Infinity].forEach(function(value) {
      it('should not crash for an invalid value()', function() {
        expect(starFilter(value)).toEqual(undefined);
      });
    });
  });

});
