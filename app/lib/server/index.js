const log = require('log');
const restify = require('restify');
const restifyValidation = require('node-restify-validation');

const serverConfig = {
    name: process.env.APP_NAME,
    version: process.env.APP_VERSION,
    log,
};

module.exports = createServer;

function createServer() {
    const server = restify.createServer(serverConfig);

    server
        .on('error', onError)
        .on('listening', onListening)
        .pre((req, res, next) => {
            req.log.info({ req }, 'start');
            return next();
        })
        .use(restify.requestLogger())
        .use(restify.queryParser())
        .use(restify.bodyParser())
        .use((req, res, next) => {
            if (req.path() === '/favicon.ico') {
                res.setHeader('content-type', 'image/x-icon');
                return res.send();
            }
            return next();
        })
        .use(restifyValidation.validationPlugin({
            errorsAsArray: true,
            forbidUndefinedVariables: false,
            errorHandler: restify.errors.InvalidArgumentError,
        }))
        .listen(process.env.PORT);

    return server;
}

// -------------------------------------

function onError(err) {
    log.error(err);

    throw new Error(err);
}

function onListening() {
    log.info(`Listening on port ${process.env.PORT}`);
}
