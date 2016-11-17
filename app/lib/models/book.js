const bookshelf = require('database');

module.exports = bookshelf.Model.extend({
    tableName: 'books',
    orderedUuids: ['id', 'author_id'],
    orderedUuidPrefix: 'BO',
    softDelete: true,
});
