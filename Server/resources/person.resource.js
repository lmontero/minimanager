/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
//var personModule = require('../database/people.module');
//var db = require('../database/database').createDatabase();

/*function getFunction(req, res, next) {
  res.send(200, personModule.getAllPersons());
  return next();
}

function postFunction(req, res, next) {
  try {
    res.send(201, db.people.insertOne(req.body));
    return next();
  }
  catch (error){
    var errorObject = {
      code: error,
      title: "Bad Request",
      detail: "An error was happen trying to save a new Person."
    };
    var result = {};
    result.errors = [];
    result.errors.push(errorObject);
    res.send(400, result);
    return next();
  }
}*/

var parser = require('../util/parse.to.json');



function execute(server, db) {
  server.get('/people', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.people.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'People');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        /*console.log('error: ' + error);
        var errorObject = {
          code: error,
          title: "Bad Request",
          detail: "An error was happen trying to get people."
        };
        var result = {};
        result.errors = [];
        result.errors.push(errorObject);*/
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get people.');
        res.send(400, jsonObject);
        return next();
      });
  });

  server.post('/people', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.people.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'People');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Person.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute/*{
  getFunction: getFunction,
  postFunction: postFunction
};*/

//cambiar las consultas con promesas, con el new Promise y los try catch por retornos de promesas