"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, MovieProvider) {

  $stateProvider
    .state('home', {
      url         : '/home',
      templateUrl : 'partials/home.html',
      controller  : 'homeController'
    })
    .state('movie', {
      url         : '/movies/:id',
      templateUrl : 'partials/movie.html',
      controller  : 'movieController',
      resolve     : {
        casting: function($stateParams, Movie) {
          return Movie.fetchCasting($stateParams.id)
        },
        images: function($stateParams, Movie) {
          return Movie.fetchImages($stateParams.id);
        },
        informations: function($stateParams, Movie) {
          return Movie.fetchInformations($stateParams.id);
        }
      }
    })
    .state('movies', {
      url         : '/movies',
      templateUrl : 'partials/movies.html',
      controller  : 'moviesController'
    })
    .state('editmovie', {
      url         : '/movies/edit/:id',
      templateUrl : 'partials/edit.html',
      controller  : 'editMovieController'
    });

  $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');
});
