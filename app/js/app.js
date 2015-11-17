"use strict";

angular.module('angularMovieApp', ['ui.router', 'angularMovieUI', 'angularMovieCore']);

angular.module('angularMovieApp').config(function($stateProvider, $urlRouterProvider, MovieProvider) {

  $stateProvider
    .state('home', {
      url   : '/home',
      views : {
        ''       : {
          templateUrl : 'partials/home.html',
          controller  : 'homeController'
        },
        'header' : {
          templateUrl : 'partials/header.html'
        }
      }
    })
    .state('movie', {
      url     : '/movies/:id',
      views   : {
        ''       : {
          templateUrl : 'partials/movie.html',
          controller  : 'movieController',
        },
        'header' : {
          templateUrl : 'partials/header.html'
        }
      },
      resolve : {
        movie : function($stateParams, Movie) {
          return Movie.fetchOne($stateParams.id);
        }
      }
    })
    .state('movies', {
      url   : '/movies',
      views : {
        ''       : {
          templateUrl : 'partials/movies.html',
          controller  : 'moviesController'
        },
        'header' : {
          templateUrl : 'partials/header.html'
        }
      }
    })
    .state('editmovie', {
      url   : '/movies/edit/:id',
      views : {
        ''       : {
          templateUrl : 'partials/edit.html',
          controller  : 'editMovieController'
        },
        'header' : {
          templateUrl : 'partials/header.html'
        }
      }
    });


  $urlRouterProvider.otherwise('/home');

  MovieProvider.setURI('/server/api/movies');
});