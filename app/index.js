// Config
require('dotenv').config();

// Node Modules
const restify = require('restify');
const debug = require('debug');
const bookshelf = require('./lib/database');
const redis = require('./lib/cache');

// Server
const server = require('./lib/http')({
	name: process.env.APP_NAME,
	version: '1.0.0',
});

// Application wide middleware
server.use(restify.queryParser());
server.use(restify.bodyParser());

const routes = require('./lib/routes')(server);

server.listen(process.env.PORT);
