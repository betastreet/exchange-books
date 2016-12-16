const $ = (process.env.NODE_ENV === 'production');

module.exports = {
    queues: [{
        name: 'books',
        key: ($) ? 'books' : 'testBooks',
        actions: {
            update: {
                source: 'Books',
                routingKey: ($) ? 'book.update' : 'test.book.update',
                consume: (msg, channel) => {
                    console.info(msg);
                    channel.ack(msg);
                },
            },
            create: {
                source: 'Books',
                routingKey: ($) ? 'book.create' : 'test.book.create',
                consume: (msg, channel) => {
                    console.log(msg);
                    channel.ack(msg);
                },
            },
            destroy: {
                source: 'Books',
                routingKey: ($) ? 'book.destroy' : 'test.book.destroy',
                consume: (msg, channel) => {
                    console.log(msg);
                    channel.ack(msg);
                },
            },
        },
    }],

    exchanges: [{
        name: 'Books',
        key: ($) ? 'Books' : 'testBooks',
        type: 'fanout',
    }],

    policies: [{
        name: ($) ? 'Books Federation' : 'Test Books Federation',
        pattern: ($) ? '^books' : '^testBooks',
        definition: { 'federation-upstream-set': 'all' },
        priority: 0,
        'apply-to': 'all',
    }],

    upstreams: [{
        name: 'Books',
        vhost: '/',
        value: {
            uri: 'amqp://books.whatever.joyent.triton.whatever.zone', // not a real url
        },
    }],
};
