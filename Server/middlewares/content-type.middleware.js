/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
var parser = require('../util/parse.to.json');
function execute(server) {
  server.use(function (req, res, next) {
    if (req.is('application/json')) {
      console.log('is json.');
      return next();
    }
    
    var jsonObject = parser.parseError(
      'The request header content type is not an application/json.',
      'Not Acceptable Request.',
      'The header content type is wrong.'
    );
    
    res.send(406, jsonObject);
    console.log('is not json.');
    return next();
  });
}

module.exports = execute;