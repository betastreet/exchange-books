const bunyan = require('bunyan');
const pjson = require('../../package.json');
const logConfig = require('logging.json');

let stream;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    const PrettyStream = require('bunyan-prettystream');
    stream = new PrettyStream();
    stream.pipe(process.stdout);
} else {
    const BunyanStackDriver = require('bunyan-stackdriver');
    stream = new BunyanStackDriver({
        projectId: process.env.LOG_PROJECT_ID,
        writeInterval: 1,
        logName: pjson.name,
        resource: {
            type: 'project',
            labels: {
                project_id: process.env.LOG_PROJECT_ID,
            },
        },
    }, (err) => {
        console.log(err);
    });
}

function loggerOptions(name = null) {
    const level = (name && logConfig.modules[name]? logConfig.modules[name] : logConfig.default) || 'debug';
    const options = {
        name: pjson.name,
        streams: [{
            type: 'raw',
            stream: stream,
            level: level,
        }],
        serviceContext: {
            service: pjson.name,
            version: pjson.version
        },
    };
    if (name) {
        options.module = name;
    }
    return options;
}


const log = bunyan.createLogger(loggerOptions());
log.module = function(name) {
    return bunyan.createLogger(loggerOptions(name));
};

module.exports = log;
