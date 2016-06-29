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

//Default error messages
//const CREATE_SUCCESS_MESSAGE = { message: 'The object was created successfully.' };
const ERROR_JSON_CONTENT_TYPE_MESSAGE = { message: 'The request not have application/json content type.' };





//This function will check if the API's have the application/json content type.
server.use(function (req, res, next) {
  if (req.is('application/json')) {
    return next();
  }
  res.send(400, ERROR_JSON_CONTENT_TYPE_MESSAGE);
  return next(err);
});





//GET localhost:8080/person
server.get('/person', function (req, res, next) {
  console.log('pasa el middleware');
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
    res.send(400, error);
    return next();
  }
  //modulePerson.insertPerson(req.body) ? res.send(201, CREATE_SUCCESS_MESSAGE) : res.send(400, ERROR_SAME_PRIMARY_KEY_MESSAGE);
  
});




server.listen(8080, 'localhost', function() {
  console.log('%s listening at %s', server.name, server.url);
});











/*server.use(restify.queryParser());    //para activar el paso de variables por la url
 server.use(restify.bodyParser({ mapParams: true}));

 server.get('/hello/:name', function(req, res, next) {
 return res.redirect(
 301,
 {
 hostname: '/localhost',
 pathname: '/bye',
 port: 8080,                 // defaults to 80
 secure: true,             // sets https
 permanent: true,
 query: {
 b: req.params.name
 }
 },
 next);
 });

 server.get('/bye', function (req, res, next) {
 console.log('bye bye.');
 res.send(200, 'Good bye ' + req.query.b);
 return next();
 });*/