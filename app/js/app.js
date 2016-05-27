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
        movie : function($stateParams, Movie) {
          var movie = {};
          return Movie.fetchCasting($stateParams.id)
            .then(function(casting) {
              angular.extend(movie, casting.data);
              return Movie.fetchImages($stateParams.id)
            }).then(function(images) {
              angular.extend(movie, images.data);
              return Movie.fetchInformations($stateParams.id)
            }).then(function(informations) {
              angular.extend(movie, informations.data);
              return movie;
            });
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
