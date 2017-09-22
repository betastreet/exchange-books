const pjson = require('../../package.json');

const logger = require('bunyan-buddy')({
    app_name: pjson.name,
});

module.exports = logger;
