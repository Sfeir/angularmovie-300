// Generated on 2014-08-07 using generator-webapp 0.4.6
'use strict';
var path = require('path');
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // Configurable paths
            app: 'app',
            dist: 'dist'
        },

        express: {
            options: {
                port: 9000,
                hostname: '*',
                server: path.resolve('./server/server-dev.js')
            },
            livereload: {
                options: {
                    livereload: true,
                    serverreload: false,
                    open:true,
                    bases: []
                }
            }
        },
        clean: {
            server: '.tmp'
        }

    });

    grunt.registerTask('serve', [
        'clean:server',
        'express:livereload',
        'watch'
    ]);


    grunt.registerTask('default', 'serve');
};
