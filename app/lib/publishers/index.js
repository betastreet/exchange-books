const bookshelf = require('database');
const rabit = require('rmq-exchange')(require('rabbit-config'));
const Book = require('models/book');

rabit.channel().then(channel => channel.publishTo('books', 'create', 'test')).catch(console.error);

bookshelf.on('created', Book, (model) => {
    console.log('================');
    rabit.channel().then((channel) => {
        channel.publishTo('Books', 'create', model.toJSON());
    });
});

bookshelf.on('updated', Book, (model) => {
    rabit.channel().then((channel) => {
        channel.publishTo('books', 'update', model.toJSON());
    });
});

bookshelf.on('destroyed', Book, (model) => {
    rabit.channel().then((channel) => {
        channel.publishTo('books', 'delete', model.toJSON());
    });
});
