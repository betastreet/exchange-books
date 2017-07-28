const bunyan = require('bunyan');

const name = process.env.APP_NAME || 'node_app';
const limit = process.env.LOG_RINGBUFFER_LENGTH || 100;
const count = parseInt(process.env.LOG_FILE_COUNT || 10, 2);
const period = process.env.LOG_PERIOD_LENGTH || '1d';
const logFile = `${process.env.LOG_PATH || '/var/log'}/${name}`;

const ringbuffer = new bunyan.RingBuffer({ limit });

const log = bunyan.createLogger({
    name: process.env.APP_NAME || 'node_app',
    streams: [
        // uncomment for many more logs
        // {
        //     level: 'trace',
        //     stream: process.stdout,
        // },
        //{
        //    level: 'trace',
        //    type: 'raw',
        //    stream: ringbuffer,
        //}, {
        //    type: 'rotating-file',
        //    level: 'info',
        //    path: `${logFile}.info.log`,
        //    count,
        //    period,
        //},
	{
            type: 'rotating-file',
            level: 'error',
            path: `${logFile}.error.log`,
            count,
            period,
        },
    ],
});

log.ringbuffer = new bunyan.RingBuffer({ limit });

// -------------------------------------

module.exports = log;
