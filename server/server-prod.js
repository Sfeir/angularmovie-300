var app     = require('./server'),
    express = require('express'),
    path    = require('path');


app.use(express.static(path.join(__dirname, '..', 'dist')));
console.log('Express is in PROD mode');

module.exports = app;
