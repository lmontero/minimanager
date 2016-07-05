/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var teamModule = require('../database/team.module');

function functionPost(req, res, next) {
  try {
    res.send(201, teamModule.addTeam(req.body));
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

function functionGet(req, res, next) {
  res.send(200, teamModule.getAllTeams());
  return next();
}

module.exports = {
  functionPost: functionPost,
  functionGet: functionGet
};