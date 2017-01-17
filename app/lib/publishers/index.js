const Book = require('models/book');
const bookshelf = require('database').bookshelf;
const rabbit = require('rmq-exchange');

bookshelf.on('created', Book, (model) => {
    rabbit.publishTo('Books', 'create', model.toJSON())
        .catch(console.error);
});

bookshelf.on('updated', Book, (model) => {
    rabbit.publishTo('Books', 'update', model.toJSON())
        .catch(console.error);
});

bookshelf.on('destroyed', Book, (model) => {
    rabbit.publishTo('Books', 'destroy', model.toJSON())
        .catch(console.error);
});
