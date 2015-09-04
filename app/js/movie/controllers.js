"use strict";

angular.module('angularMovieCore').controller("mainController", function($scope, $rootScope) {

  $scope.loading = false;

  $rootScope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {
    $scope.loading = true;
    });

  $rootScope.$on('$stateChangeSuccess',
    function (event, toState, toParams, fromState, fromParams) {
      $scope.loading = false;
    });

  $rootScope.$on('$stateChangeError',
    function (event, toState, toParams, fromState, fromParams) {
      console.error('StateError', event);
      $scope.loading = false;
    });

});

angular.module('angularMovieCore').controller("homeController", function($scope) {

  $scope.user = 'Thierry LAU';

});

angular.module('angularMovieCore').controller("moviesController", function($scope, Movie, $filter) {

  // display mode by default
  $scope.tableView = false;
  // icon by mode by default
  $scope.tableViewIcon = 'icon-th icon-white';

  // function called when changing view mode
  $scope.toogleView = function() {
    $scope.tableView = !$scope.tableView;

    if ($scope.tableView === false) {
      $scope.tableViewIcon = 'icon-th-list icon-white';
    } else {
      $scope.tableViewIcon = 'icon-th icon-white';
    }
  };

  Movie.fetch().success(function(resp) {
    $scope.movies = resp;
    $scope.filteredMovies = $scope.movies;
  });

  $scope.deleteMovie = function(index) {
    Movie.remove($scope.filteredMovies[index].id)
      .success(function(resp) {
        $scope.filteredMovies.splice(index, 1);
      }
    );
  };

  $scope.filterMovies = function() {
    $scope.filteredMovies = $filter('filter')($scope.movies, $scope.search);
  };

  $scope.sortMovies = function(tri, reverse) {
    $scope.tri = tri;
    $scope.reverse = reverse;
    $scope.filteredMovies = $filter('orderBy')($scope.filteredMovies, $scope.tri, $scope.reverse);
  };

});

angular.module('angularMovieCore').controller('movieController', function($scope, casting, images, informations, $state, Movie) {
  $scope.casting = casting.data;
  $scope.images = images.data;
  $scope.informations = informations.data;

  $scope.deleteMovie = function(id) {
    Movie.remove(id)
      .success(function(resp){
        $state.go('movies');
      }
    );
  };
});

angular.module('angularMovieCore').controller('editMovieController', function($scope, Movie, $stateParams, $location) {

  var movieId = $stateParams.id;

  Movie.fetchOne(movieId).success(function(movie) {
    $scope.movie = movie;
  });

  $scope.updateMovie = function(movie) {
    Movie.update(movie)
      .success(function() {
        $location.path('/movies');
      })
      .error(function(resp) {
        console.log(resp);
      });
  };
});

angular.module('angularMovieCore').controller("movieFormController", function($scope, Movie) {

  $scope.showAlert = false;

  $scope.addMovie = function(movie) {
    Movie.create(movie)
      .success(function(movie) {
        $scope.movies.push(movie);
        $scope.movie     = {};
        $scope.showAlert = false;
        $('#movie-form-modal').modal('hide');
      })
      .error(function(resp, statusCode) {
        console.log('Error : ' + statusCode);
      });
  };
});
