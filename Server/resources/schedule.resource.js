/**
 * Created by Luis Montero on 7/19/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/schedules', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.schedules.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Schedules');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get schedules.');
        return next(jsonObject);
      });
  });

  server.post('/schedules', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.schedules.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Schedules');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Schedule.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;