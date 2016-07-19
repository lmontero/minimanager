/**
 * Created by Luis Montero on 7/19/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/members', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.members.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Members');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get members.');
        return next(jsonObject);
      });
  });

  server.post('/members', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.members.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Members');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Member.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;