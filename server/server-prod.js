var app = require('./server');
var express = require('express');
var path = require('path');


app.use(express.static(path.join(__dirname, '..', 'dist')));
console.log('Express is in PROD mode');

module.exports = app;
