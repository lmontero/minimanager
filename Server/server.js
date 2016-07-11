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
server.use(restify.fullResponse());


var database = require('./database/database').createDatabase();


//Middlewares
require('./middlewares/content-type.middleware')(server);


//Resources or controllers.
require('./resources/person.resource')(server, database);
require('./resources/team.resource')(server, database);



server.listen(8080, 'localhost', function() {
  console.log('%s listening at %s', server.name, server.url);
});




//Crear utro apartado para la creacion de objetos JSON para el retorno de las API.