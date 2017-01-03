const bookshelf = require('database');
const rabbit = require('rmq-exchange');
const Book = require('models/book');

bookshelf.on('created', Book, (model) => {
    rabbit.channel().then((channel) => {
        channel.publishTo('Books', 'create', model.toJSON())
            .catch(console.error);
    });
});

bookshelf.on('updated', Book, (model) => {
    rabbit.channel().then((channel) => {
        channel.publishTo('Books', 'update', model.toJSON())
            .catch(console.error);
    });
});

bookshelf.on('destroyed', Book, (model) => {
    rabbit.channel().then((channel) => {
        channel.publishTo('Books', 'destroy', model.toJSON())
            .catch(console.error);
    });
});
