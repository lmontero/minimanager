/**
 * Created by Luis Montero on 7/15/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');

function execute(server, db) {
  server.get('/rooms', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.rooms.find()
      .then(function (result) {
        var jsonObject = parser.parseSuccessMany(result, 'Rooms');
        res.send(200, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to get rooms.');
        return next(jsonObject);
      });
  });
  
  server.post('/rooms', function (req, res, next) {
    if (res.statusCode >= 400) {
      return next();
    }
    
    db.rooms.insertOne(req.body)
      .then(function (result) {
        var jsonObject = parser.parseSuccessOne(result, 'Rooms');
        res.send(201, jsonObject);
        return next();
      })
      .catch(function (error) {
        var jsonObject = parser.parseError(error, 'Bad Request', 'An error was happen trying to save a new Room.');
        res.send(400, jsonObject);
        return next();
      });
  });
}

module.exports = execute;