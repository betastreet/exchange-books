require('database');
const server = require('server')();
require('routes')(server);

module.exports = server;
