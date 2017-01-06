const Piloted = require('piloted');
const rabbit = require('rmq-exchange');

Piloted.config(require(process.env.CONTAINERPILOT_PATH), (err) => {
    if (err) console.error(err);

    const rmqService = Piloted.service('rabbitmq');

    Piloted.on('refresh', () => {
        rabbit.close();
        rabbit.connect(rmqService.address)
            .then(() => rabbit.create())
            .catch(err => { throw err; });
    });
});

require('database');
const server = require('server')();
require('routes')(server);
require('publishers');

module.exports = server;

