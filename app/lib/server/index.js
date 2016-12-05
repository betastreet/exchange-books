const log = require('log');
const restify = require('restify');
const restifyValidation = require('node-restify-validation');

const serverConfig = {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    log,
};

module.exports = exports = createServer;

function createServer() {
    const server = restify.createServer(serverConfig);

    server
        .on('error', exports.onError)
        .on('listening', exports.onListening)
        .pre((req, res, next) => {
            req.log.info({ req }, 'start');
            return next();
        })
        .use(restify.requestLogger())
        .use(restify.queryParser())
        .use(restify.bodyParser())
        .use(restifyValidation.validationPlugin({
            errorsAsArray: true,
            forbidUndefinedVariables: false,
            errorHandler: restify.errors.InvalidArgumentError,
        }))
        .listen(process.env.PORT);

    return server;
}

// -------------------------------------

exports.onError = function onError(err) {
    log.error(err);

    const ServerError = Error;

    throw new ServerError(err);
};

exports.onListening = function onListening() {
    log.info(`Listening on port ${process.env.PORT}`);

    return true;
};
