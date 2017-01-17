const $ = (process.env.NODE_ENV === 'production');

module.exports = {
    queues: [{
        name: 'Books',
        key: ($) ? 'books' : 'testBooks',
        actions: {
            update: {
                source: 'Books',
                routingKey: ($) ? 'book.update' : 'test.book.update',
            },
            create: {
                source: 'Books',
                routingKey: ($) ? 'book.create' : 'test.book.create',
            },
            destroy: {
                source: 'Books',
                routingKey: ($) ? 'book.destroy' : 'test.book.destroy',
            },
        },
    }],

    exchanges: [{
        name: 'Books',
        key: ($) ? 'Books' : 'testBooks',
        type: 'direct',
    }],

    policies: [{
        name: ($) ? 'Books Federation' : 'Test Books Federation',
        pattern: ($) ? '^books' : '^testBooks',
        definition: { 'federation-upstream-set': 'all' },
        priority: 0,
        'apply-to': 'all',
    }],

    upstreams: [],
};
