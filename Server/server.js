/**
 * Created by Luis Montero on 6/28/2016.
 */
'use strict';
var restify = require('restify');
var server = restify.createServer({
  name: 'minimanager'
});

//Libraries
server.use(restify.bodyParser());   //Enable to send data by body.

//Resources
var personResource = require('./resources/person.resource');
var teamResource = require('./resources/team.resource');

//Handlers
var contentTypeHandler = require('./handlers/content-type.handler');

//This function will check if the API's have the application/json content type.
server.use(contentTypeHandler.jsonFunction);


//GET localhost:8080/person
server.get('/person', personResource.functionGet);

//POST localhost:8080/person
server.post('/person', personResource.functionPost);

//POST localhost:8080/team
server.post('/team', teamResource.functionPost);

//GET localhost:8080/team
server.get('/team', teamResource.functionGet);



server.listen(8080, 'localhost', function() {
  console.log('%s listening at %s', server.name, server.url);
});