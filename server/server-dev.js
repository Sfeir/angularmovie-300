var app = require('./server');
var express = require('express');
var path = require('path');

app.use(express.static(path.join(__dirname, '..', 'app')));
console.log('Express is in DEV mode');

module.exports = app;
