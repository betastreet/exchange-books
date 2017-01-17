require('queue');
require('database');
const server = require('server')();
require('routes')(server);
require('publishers');

module.exports = server;

