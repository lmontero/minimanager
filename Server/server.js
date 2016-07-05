/**
 * Created by Luis Montero on 6/28/2016.
 */

'use strict';
var restify = require('restify');
var server = restify.createServer({
  name: 'minimanager'
});
server.use(restify.bodyParser());   //Enable to send data by body.

//MODULES
var modulePerson = require('./database/person.module');

//This function will check if the API's have the application/json content type.
server.use(function (req, res, next) {
  if (req.is('application/json')) {
    return next();
  }
  var errorObject = {
    code: "The accept header is not an application/json.",
    title: "Not Acceptable Response",
    detail: "The Header is wrong."
  };
  var result = {};
  result.errors = [];
  result.errors.push(errorObject);
  res.send(406, result);
  return next(err);
});





//GET localhost:8080/person
server.get('/person', function (req, res, next) {
  res.send(200, modulePerson.getAllPersons());
  return next();
});

//POST localhost:8080/person
server.post('/person', function (req, res, next) {
  try {
    console.log('pasa el middleware');
    res.send(201, modulePerson.insertPerson(req.body));
    return next();
  }
  catch (error){
    var errorObject = {
      status: "400",
      code: error,
      title: "Bad Request",
      detail: "An error was happen trying save a new Person."
    };
    var result = {};
    result.errors = [];
    result.errors.push(errorObject);
    res.send(400, result);
    return next();
  }
});




server.listen(8080, 'localhost', function() {
  console.log('%s listening at %s', server.name, server.url);
});