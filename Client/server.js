/**
 * Created by Luis Montero on 7/13/2016.
 */
'use strict';

var express = require('express');
var server = express();

function allowHeader(req, res, next) {
  req.accepts('application/json');
}

server.use('/bower_components', express.static('bower_components'));
server.use(express.static('img'));
server.use(express.static('src'));

server.use(allowHeader);

server.get('/', function (req, res, next) {
  console.log(req);
});

server.listen(3000, 'localhost',  function () {
  console.log('Listening 3000');
});