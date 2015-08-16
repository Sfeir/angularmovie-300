"use strict";

/**
 * inspired by http://www.adobe.com/devnet/html5/articles/angularjs-directives-and-the-computer-science-of-javascript.html
 * by Burke Holland
 */
angular.module('angularMovieUI').directive('editable', function() {

  return {
    restrict    : 'E',
    replace     : true,
    templateUrl : "partials/editable.html",
    scope       : {
      label : '@',
      text  : '='
    },
    link        : function(scope, element, attrs) {

      // editMode is disable by default
      scope.editMode = false;

      // if label attribut is not provide then remove
      // the label element
      if (!attrs.label) {
        element.find('label').remove();
      }

      // find the input elemnt of this directive ...
      var input = element.find('input');
      // and listen for blur event
      input.bind('blur', function() {
        // since blur event occured ouside the angular execution context
        // we need to call scope.$apply to tell angularjs about the changes
        scope.$apply(function() {
          // the change is to disable the editMode
          scope.editMode = false;
        });

      });

    }
  }

});

angular.module('angularMovieUI').directive('rating', function() {
  return {
    restrict   : 'E',
    transclude : true,
    template   : '<ul class="rating" ng-class="{readonly: readonly}">' +
    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="rate($index)">' +
    '    <ng-transclude></ng-transclude>' +
    '  </li>' +
    '</ul>',
    scope      : {
      ratingValue : '=ngModel',
      max         : '=?',
      readonly    : '=?'
    },
    link       : function(scope, element, attributes) {
      if (scope.max == undefined) {
        scope.max = 5;
      }
      if (scope.ratingValue == undefined) {
        scope.ratingValue = 1;
      }
      function updateValue() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled : i < scope.ratingValue
          });
        }
      }
      scope.rate = function(index) {
        if (scope.readonly == undefined || scope.readonly === false) {
          scope.ratingValue = index + 1;
        }
      };
      scope.$watch('ratingValue', function(newValue) {
        if (newValue) {
          updateValue();
        }
      });
    }
  };
});

angular.module('angularMovieUI').directive('directorValidator', function() {
  return {
    require : 'ngModel',
    link : function($scope, element, attrs, ngModel) {
      ngModel.$validators.director = function(value) {
        if(value) {
          return value.split(' ').length > 1;
        }
      };
    }
  }
});

angular.module('angularMovieUI').directive('movieAvailableValidator', ['Movie', '$q', function(Movie, $q) {
  return {
    require : 'ngModel',
    link : function($scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.titleAvailable = function(title) {
        return Movie.search(title).then(function() {
          return $q.reject('exists');
        }, function() {
          return true;
        });
      };
    }
  }
}]);


