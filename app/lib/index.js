global.Promise = require('bluebird');

const log = require('log');

process.on('uncaughtException', (err) => {
    log.error(err);
});

process.on('unhandledRejection', (reason, p) => {
    log.error(reason);
});

require('queue');
require('database');
const server = require('server')();
require('routes')(server);
require('publishers');

module.exports = server;
