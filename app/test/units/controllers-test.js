'use strict';

describe('mainController', function() {
  var controller,
    rootScope,
    scope,
    translate;

  beforeEach(module('angularMovieCore'));

  beforeEach(inject(function($controller, $injector, $q, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    translate = {
      use: jasmine.createSpy().and.returnValue($q.when())
    };

    controller = $controller('mainController', {
      $scope: scope,
      $rootScope: $rootScope,
      $translate: translate
    });
  }));

  it('should have a default state', function() {
    expect(scope.loading).toBeFalsy();
  });

  it('should toggle loading state on events', function() {
    scope.$emit('$stateChangeStart');
    expect(scope.loading).toBeTruthy();
    scope.$emit('$stateChangeSuccess');
    expect(scope.loading).toBeFalsy();
    scope.$emit('$stateChangeStart');
    expect(scope.loading).toBeTruthy();
    scope.$emit('$stateChangeError');
    expect(scope.loading).toBeFalsy();
  });

  it('should change language', function() {
    scope.setLang();
    expect(translate.use).toHaveBeenCalledWith('frFR');
    scope.setLang('jp');
    expect(translate.use).toHaveBeenCalledWith('jp');
  });
});

describe('moviesController', function() {
  var Movie = {
    fetch: function(){},
    remove: function(){},
  };
  var controller,
    scope;

  beforeEach(module('angularMovieCore'));

  beforeEach(inject(function($controller, $filter, $injector, $q, $rootScope) {
    scope = $rootScope.$new();

    spyOn(Movie, 'fetch').and.callFake(function() {
      return {
        success: function(callback) {
          callback([
            {
              id: 0,
              name: 'Back to the future 1'
            },
            {
              id: 1,
              name: 'Wayne\'s World'
            }
          ]);
        }
      };
    });

    spyOn(Movie, 'remove').and.callFake(function() {
      return {
        success: function(callback) {
          callback();
        }
      };
    });

    controller = $controller('moviesController', {
      $scope: scope,
      Movie: Movie,
      $filter: $filter
    });
  }));

  it('should have a default state', function() {
    expect(scope.tableView).toBeFalsy();
    expect(scope.tableViewIcon).toEqual('icon-th icon-white');
    expect(Movie.fetch).toHaveBeenCalled();
  });

  it('should toggle view', function() {
    scope.toogleView();
    expect(scope.tableView).toBeTruthy();
    expect(scope.tableViewIcon).toEqual('icon-th icon-white');

    scope.toogleView();
    expect(scope.tableView).toBeFalsy();
    expect(scope.tableViewIcon).toEqual('icon-th-list icon-white');
  });

  it('should delete movie', function() {
    expect(scope.filteredMovies.length).toEqual(2);
    scope.deleteMovie(0);
    expect(scope.filteredMovies.length).toEqual(1);
  });

  it('should filter movies', function() {
    expect(scope.filteredMovies.length).toEqual(2);

    scope.search = 'Wayne';
    scope.filterMovies();
    scope.$apply();

    expect(scope.filteredMovies.length).toEqual(1);

    scope.search = 'Plop';
    scope.filterMovies();

    expect(scope.filteredMovies.length).toEqual(0);
  });

  it('should sort movies', function() {
    var movie1 = {
      id: 0,
      name: 'Back to the future 1'
    };
    var movie2 = {
      id: 1,
      name: 'Wayne\'s World'
    };

    scope.sortMovies(false, false);
    expect(scope.filteredMovies).toEqual([movie1, movie2]);

    scope.sortMovies(false, true);
    expect(scope.filteredMovies).toEqual([movie2, movie1]);

  });
});

describe('movieController', function() {
  var Movie = {
    fetch: function(){},
    remove: function(){},
  };
  var controller,
    scope,
    state;

  beforeEach(module('angularMovieCore'));

  beforeEach(inject(function($controller, $filter, $injector, $q, $rootScope) {
    scope = $rootScope.$new();

    spyOn(Movie, 'remove').and.callFake(function() {
      return {
        success: function(callback) {
          callback();
        }
      };
    });

    state = {
      go: jasmine.createSpy('$state.go')
    };

    controller = $controller('movieController', {
      $scope: scope,
      movie: {
        data: {
          id: 0,
          name: 'Back to the future 1'
        }
      },
      $state: state,
      Movie: Movie
    });
  }));

  it('should have a default state', function() {
    expect(scope.movie).toEqual({
      id: 0,
      name: 'Back to the future 1'
    });
  });

  it('should delete movie', function() {
    scope.deleteMovie(0);
    expect(state.go).toHaveBeenCalled();
  });
});

describe('editMovieController', function() {
  var Movie = {
    fetchOne: function(){},
    update: function(){},
  };
  var controller,
    location,
    scope,
    state;

  beforeEach(module('angularMovieCore'));

  beforeEach(inject(function($controller, $filter, $injector, $q, $rootScope) {
    scope = $rootScope.$new();

    location = {
      path: jasmine.createSpy()
    };

    spyOn(Movie, 'fetchOne').and.callFake(function() {
      return {
        success: function(callback) {
          callback({
            id: 0,
            name: 'Back to the future 1'
          });
        }
      };
    });

    spyOn(Movie, 'update').and.callFake(function() {
      return {
        success: function(callback) {
          callback();
          return {
            error: function() {}
          }
        }
      };
    });

    controller = $controller('editMovieController', {
      $scope: scope,
      Movie: Movie,
      $stateParams: {
        id: 0
      },
      $location: location
    });
  }));

  it('should update a movie', function() {
    scope.updateMovie({
      id: 0,
      name: 'Back to the future 42'
    });

    expect(location.path).toHaveBeenCalledWith('/movies');
  });
});

describe('movieFormController', function() {
  var Movie = {
    create: function() {}
  };
  var controller,
    element,
    scope,
    state;

  beforeEach(module('angularMovieCore'));

  beforeEach(inject(function($controller, $filter, $injector, $q, $rootScope) {
    scope = $rootScope.$new();

    spyOn(Movie, 'create').and.callFake(function() {
      return {
        success: function(callback) {
          callback();
          return {
            error: function() {}
          }
        }
      };
    });

    controller = $controller('movieFormController', {
      $scope: scope,
      Movie: Movie
    });
  }));

  it('should have a default state', function() {
    expect(scope.showAlert).toBeFalsy();
  });

  it('should add a movie', function() {
    scope.movies = [];
    scope.addMovie({ name: 'Plan 9 from outer space'});
    expect(scope.movies.length).toEqual(1);
  });
});
