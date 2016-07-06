/**
 * Created by Luis Montero on 7/5/2016.
 */
'use strict';
/*function json(req, res, next) {
  if (req.is('application/json')) {
    return next();
  }
  var errorObject = {
    code: "The content type header is not an application/json.",
    title: "Not Acceptable Response",
    detail: "The Header is wrong."
  };
  var result = {};
  result.errors = [];
  result.errors.push(errorObject);
  res.send(406, result);
  return next(err);
}*/

function execute(server) {
  
  //Content type Json.
  server.use(function (req, res, next) {
    if (req.is('application/json')) {
      return next();
    }
    var errorObject = {
      code: "The content type header is not an application/json.",
      title: "Not Acceptable Response",
      detail: "The Header is wrong."
    };
    var result = {};
    result.errors = [];
    result.errors.push(errorObject);
    res.send(406, result);
    return next(err);
  });
}

/*module.exports = {
  jsonFunction: json
};*/

module.exports = execute;

//cambiar a middleware