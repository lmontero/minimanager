/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/teams', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.teams.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Teams');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get teams.');
        return next(jsonObject);
      });
  });
  
  server.post('/teams', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.teams.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Teams');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Team.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;