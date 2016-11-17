require('database');
const restify = require('restify');
const server = require('server')();
require('routes')(server);

// Application wide middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());
