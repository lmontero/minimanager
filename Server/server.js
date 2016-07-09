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
//var personResource = require('./resources/person.resource');
//var teamResource = require('./resources/team.resource');



//This function will check if the API's have the application/json content type.
//server.use(contentTypeHandler.jsonFunction);


//GET localhost:8080/person
//server.get('/person', personResource.getFunction);

//POST localhost:8080/person
//server.post('/person', personResource.postFunction);

//POST localhost:8080/team
//server.post('/team', teamResource.postFunction);

//GET localhost:8080/team
//server.get('/team', teamResource.getFunction);

//pasar todas estas rutas en diferentes archivos enviando el server u route


var database = require('./database/database').createDatabase();


//Middlewares
var contentTypeHandler = require('./middlewares/content-type.middleware')(server);


//Resources or controllers.
var personResource = require('./resources/person.resource')(server, database);
var teamResource = require('./resources/team.resource')(server, database);



server.listen(8080, 'localhost', function() {
  console.log('%s listening at %s', server.name, server.url);
});




//Crear utro apartado para la creacion de objetos JSON para el retorno de las API.