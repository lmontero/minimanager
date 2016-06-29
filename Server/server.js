/**
 * Created by Luis Montero on 6/28/2016.
 */
var restify = require('restify');
var server = restify.createServer();

server.get('/hello/:name', function(req, res, next) {
  // some internal unrecoverable error
  var err = new restify.errors.InternalServerError('oh noes!');
  return next(err);
});

server.on('InternalServer', function (req, res, err, cb) {
  err.body = 'something is wrong!';
  return cb();
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});