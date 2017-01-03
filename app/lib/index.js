const Piloted = require('piloted');

Piloted.config(require(process.env.CONTAINERPILOT_PATH), (err) => {
    if (err) console.error(err);

    console.log('piloted');

    Piloted.on('refresh', () => {
        console.log(this, ...arguments);
        console.log('stuff');
    });
});

require('database');
const server = require('server')();
require('routes')(server);
require('publishers');

module.exports = server;

console.log('stuff x');
