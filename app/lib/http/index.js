const debug = require('debug');
const restify = require('restify');

const log = debug('APP:HTTP');
const error = debug('APP:ERROR:HTTP');

module.exports = function(options) {
    return restify.createServer(options)
        .on('error', onError)
        .on('listening', onListening);
};

// -------------------------------------

function onError(err) {
    error(err);

    throw new Error(err);
}

function onListening() {
    log(`Listening on port ${process.env.PORT}`);
}
