require('database');
require('rmq-exchange')(require('rabbit-config'));
const server = require('server')();
require('routes')(server);

require('publishers');

module.exports = server;
