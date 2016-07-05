/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var personModule = require('../database/person.module');

function getFunction(req, res, next) {
  res.send(200, personModule.getAllPersons());
  return next();
}

function postFunction(req, res, next) {
  try {
    res.send(201, personModule.addPerson(req.body));
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
}

module.exports = {
  getFunction: getFunction,
  postFunction: postFunction
};