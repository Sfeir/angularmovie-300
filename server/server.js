/**
 * Module dependencies.
 */

"use strict";
var express        = require('express'),
    api            = require('./routes/api'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    path           = require('path'),
    app            = express(),
    cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    csrf           = require('csurf'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    isLoggedIn,
    localUser;

// Configuration Passport
localUser = {id : 1, username : 'Sfeir', password : 'Rocks'};
passport.use(new LocalStrategy(
  function(username, password, next) {
    if (!username || !password) {
      return next(null, false);
    }
    if (username === localUser.username && password === localUser.password) {
      return next(null, localUser);
    } else {
      return next(null, false);
    }
  }
));

passport.serializeUser(function(user, next) {
  next(null, localUser.id);
});

passport.deserializeUser(function(id, next) {
  next(null, localUser);
});

isLoggedIn = function(req, res, next) {
  if (!req.isAuthenticated()) {
    var err    = new Error();
    err.status = 401;
    return next(err);
  }
  next();
};

// Configuration
app.set('port', 9000);
app.use(bodyParser());
app.use(cookieParser());
//app.use(csrf({cookie : true}));
app.use(session({secret : 'SfeirRocks', resave : false, saveUninitialized : false}));

app.use(passport.initialize());
app.use(passport.session());
//app.use(function(req, res, next) {
//  //res.cookie('XSRF-TOKEN', req.csrfToken());
//  res.cookie('SfeirToken', req.csrfToken());
//  next();
//});

//app.use(methodOverride());
app.use(express.static(path.join(__dirname, '..', '.tmp')));

// JSON AUTH
app.get('/server/auth', function(req, res) {
  if (!req.isAuthenticated()) {
    res.status(200).json({error : 'Not Authenticated'});
  }
  res.status(200).json({user : req.user});
});
app.post('/server/auth',
  passport.authenticate('local'),
  function(req, res) {
    res.status(200).json({user : req.user});
  });
app.get('/server/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// JSON API
app.get('/server/api/movies', isLoggedIn, api.fetchMovies);
app.get('/server/api/movies/search', isLoggedIn, api.searchMovieByTitle);
app.get('/server/api/movies/:id', isLoggedIn, api.fetchMovie);
app.get('/server/api/movies/:id/informations', isLoggedIn, api.fetchMovieInformations);
app.get('/server/api/movies/:id/images', isLoggedIn, api.fetchMovieImages);
app.get('/server/api/movies/:id/casting', isLoggedIn, api.fetchMovieCasting);
app.post('/server/api/movies', isLoggedIn, api.addMovie);
app.put('/server/api/movies', isLoggedIn, api.updateMovie);
app.delete('/server/api/movies/:id', isLoggedIn, api.deleteMovie);


module.exports = app;

console.log('Express server listening on port ' + app.get('port'));
