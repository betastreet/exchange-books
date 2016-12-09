const bookshelf = require('database');
const rabit = require('queue');
// const Book = require('models/book');

module.exports = function publishers() {
    bookshelf.on('saved', 'Book', (model) => {
        rabit.publishToExchange('book-updates', model.toJSON());
    });
};
