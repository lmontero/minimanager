/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';

//var teamModule = require('../database/team.module');

/*function postFunction(req, res, next) {
  try {
    res.send(201, teamModule.insertOne(req.body));
    return next();
  }
  catch (error){
    var jsonResult = { errors: [] };
    var copyError = {
      code: error,
      title: 'Bad Request',
      detail: 'An error was happen trying to save a new Team.'
    };
    jsonResult.errors.push(copyError);
    res.send(400, jsonResult);
    return next();
  }
}

function getFunction(req, res, next) {
  res.send(200, teamModule.getAllTeams());
  return next();
}

module.exports = {
  postFunction: postFunction,
  getFunction: getFunction
};*/

function execute(server, db) {
  server.get('/teams', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.teams.find()
      .then(function (result) {
        res.send(200, result);
        return next();
      })
      .catch(function (error) {
        return next(error);
      });
  });
  
  server.post('/teams', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.teams.insertOne(req.body)
      .then(function (result) {
        res.send(201, result);
        return next();
      })
      .catch(function (error) {
        var jsonResult = { errors: [] };
        var copyError = {
          code: error,
          title: 'Bad Request',
          detail: 'An error was happen trying to save a new Team.'
        };
        jsonResult.errors.push(copyError);
        res.send(400, jsonResult);
        return next();
      });
  });
}

module.exports = execute;