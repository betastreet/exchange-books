const bookshelf = require('database');

exports.seed = function (knex, Promise) {
    return Promise.all([
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('BO'), 2),
            title: 'The Fox and the Hound',
            author_id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('AU'), 2),
        }),
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('BO'), 2),
            title: 'The Jungle Book',
            author_id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('AU'), 2),
        }),
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('BO'), 2),
            title: 'Twilight',
            author_id: bookshelf.Model.prefixedUuidToBinary(bookshelf.Model.generateUuid('AU'), 2),
        }),
    ]);
};
