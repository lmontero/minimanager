/**
 * Created by Luis Montero on 7/15/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/employees', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.employees.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Employees');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get employees.');
        return next(jsonObject);
      });
  });

  server.post('/employees', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.employees.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Employees');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Employee.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;