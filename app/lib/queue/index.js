const queue = require('amqplib');

const queues = {};

queues.connection = queue.connect(`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}`)
    .then(connection => connection.createChannel());

queues.publishToExchange = (exchange, data, format) => {
    let publishData = data;
    if (typeof format === 'undefined' || format === 'json') publishData = JSON.stringify(data);
    return queues.connection.then((channel) => {
        return channel.publish(exchange, '', new Buffer(publishData));
    });
};

queues.subscribeToExchange = (exchange, callback, format) => {
    queues.connection.then((channel) => {
        let q = null;
        return channel.assertExchange(exchange, 'fanout')
            .then(() => channel.assertQueue(null, { exclusive: true }))
            .then((queueData) => {
                q = queueData.queue;
                return channel.bindQueue(queueData.queue, exchange);
            })
            .then(() => {
                return channel.consume(q, (msg) => {
                    const data = msg.content.toString();
                    if (typeof format === 'undefined' || format === 'json') return callback(JSON.parse(data));
                    return callback(data);
                }, { noAck: true });
            });
    });
};

module.exports = queues;
