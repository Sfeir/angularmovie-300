/**
 * Module dependencies.
 */

"use strict";
var express = require('express')
    , api = require('./routes/api')
    , bodyParser = require('body-parser')
    , methodOverride = require('method-override')
    , path = require('path');



var app = express();

// Configuration
app.set('port', 9000);
app.use(bodyParser());
//app.use(methodOverride());
app.use(express.static(path.join(__dirname, '..', '.tmp')));


// JSON API
app.get('/server/api/movies', api.fetchMovies);
app.get('/server/api/movies/:id', api.fetchMovie);
app.post('/server/api/movies', api.addMovie);
app.put('/server/api/movies', api.updateMovie);
app.delete('/server/api/movies/:id', api.deleteMovie);


module.exports = app;

console.log('Express server listening on port ' + app.get('port'));
