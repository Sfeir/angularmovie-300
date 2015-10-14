'use strict';

describe('Movie service', function() {
  var API_URI = '/server/api/movies';
  var httpBackend;
  var Movie;

  beforeEach(module('angularMovieCore', function(MovieProvider) {
    MovieProvider.setURI(API_URI);
  }));

  beforeEach(inject(function($httpBackend, _Movie_) {
    httpBackend = $httpBackend;
    Movie = _Movie_;
  }));

  it('should fetch', function() {
    httpBackend.whenGET(API_URI).respond([
      {
        id: 0,
        name: 'Back to the future 1'
      },
      {
        id: 1,
        name: 'Wayne\'s World'
      }
    ]);

    Movie.fetch().success(function(resp) {
      expect(resp.length).toEqual(2);
    });

    httpBackend.flush();
  });

  it('should fetchOne', function() {
    var leMovie = {
      id: 1,
      name: 'Wayne\'s World'
    };

    httpBackend.whenGET(API_URI + '/1').respond(leMovie);

    Movie.fetchOne(1).success(function(resp) {
      expect(resp).toEqual(leMovie);
    });

    httpBackend.flush();
  });

  it('should search', function() {
    var leMovie = {
      id: 1,
      name: 'Wayne\'s World'
    };

    httpBackend.whenGET(API_URI + '/search?title=Wayne\'s World').respond(leMovie);

    Movie.search('Wayne\'s World').success(function(resp) {
      expect(resp).toEqual(leMovie);
    });

    httpBackend.flush();
  });

  it('should create', function() {
    httpBackend.whenPOST(API_URI).respond(200, 'okay');

    Movie.create({
      id: 1,
      name: 'Wayne\'s World'
    }).success(function(resp) {
      expect(resp).toEqual('okay');
    });

    httpBackend.flush();
  });

  it('should update', function() {
    httpBackend.whenPUT(API_URI).respond(200, 'okay');

    Movie.update({
      id: 1,
      name: 'Wayne\'s World'
    }).success(function(resp) {
      expect(resp).toEqual('okay');
    });

    httpBackend.flush();
  });

  it('should delete', function() {
    httpBackend.whenDELETE(API_URI + '/1').respond(200, 'okay');

    Movie.remove(1).success(function(resp) {
      expect(resp).toEqual('okay');
    });

    httpBackend.flush();
  });
});
