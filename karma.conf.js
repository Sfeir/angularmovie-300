'use strict';

// http://karma-runner.github.io/0.8/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',

    exclude: ['src/main/webapp/app/scripts/mediaelement/**/*'],

    frameworks: ['jasmine'],

    reporters: ['dots', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/js/**/*.js': ['coverage']
    },

    files: [
      // Our dependencies
      './app/bower_components/jquery/jquery.js',
      './app/bower_components/angular/angular.min.js',
      './app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
      './app/bower_components/bootstrap.css/js/bootstrap.min.js',
      './app/bower_components/angular-translate/angular-translate.js',
      './app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',

      // Angular mock for easy testing
      './app/bower_components/angular-mocks/angular-mocks.js',

      // Our files
      './app/js/app.js',
      './app/js/movie/movie.module.js',
      './app/js/movie/services.js',
      './app/js/movie/controllers.js',
      './app/js/ui/ui.module.js',
      './app/js/ui/filters.js',
      './app/js/ui/directives.js',
      './app/**/units/*-test.js'
    ],

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    colors: true,

    // level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS']
  });
};
