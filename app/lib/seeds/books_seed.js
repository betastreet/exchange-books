const bookshelf = require('database');

exports.seed = function (knex, Promise) {
    return Promise.all([
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary('BO455d7811ee785884b43f693fda7a17e2', 2),
            title: 'The Fox and the Hound',
            author_id: bookshelf.Model.prefixedUuidToBinary('AU42c611595f9da62c99f7e061f8df1ff2', 2),
        }),
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary('BO45db68b15391690a86e769ff652c6adb', 2),
            title: 'The Jungle Book',
            author_id: bookshelf.Model.prefixedUuidToBinary('AU4788472075f0647197cf84a9eea8d34d', 2),
        }),
        knex('books').insert({
            id: bookshelf.Model.prefixedUuidToBinary('BO47e465b473571017a5a27bdedd955cd2', 2),
            title: 'Twilight',
            author_id: bookshelf.Model.prefixedUuidToBinary('AU42c611595f9da62c99f7e061f8df1ff5', 2),
        }),
    ]);
};
