var app     = require('./server'),
    express = require('express'),
    path    = require('path');

app.use(express.static(path.join(__dirname, '..', 'app')));
console.log('Express is in DEV mode');

module.exports = app;
