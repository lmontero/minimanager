/**
 * Created by Luis Montero on 7/19/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/components', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.components.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Components');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get components.');
        return next(jsonObject);
      });
  });

  server.post('/components', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }

    db.components.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Components');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Component.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;