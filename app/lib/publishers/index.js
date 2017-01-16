const db = require('database');
const rabbit = require('rmq-exchange');

db.register((bookshelf) => {

    bookshelf.on('created', db.model('book'), (model) => {
        rabbit.publishTo('Books', 'create', model.toJSON())
            .catch(console.error);
    });

    bookshelf.on('updated', db.model('book'), (model) => {
        rabbit.publishTo('Books', 'update', model.toJSON())
            .catch(console.error);
    });

    bookshelf.on('destroyed', db.model('book'), (model) => {
        rabbit.publishTo('Books', 'destroy', model.toJSON())
            .catch(console.error);
    });

});
