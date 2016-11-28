const bookshelf = require('database');
const ModelBase = require('bookshelf-modelbase')(bookshelf);
var Joi = require('joi');

module.exports = ModelBase.extend({
    tableName: 'books',
    orderedUuids: ['id', 'author_id'],
    orderedUuidPrefix: 'BO',
    softDelete: true,
    validate: {
        id: Joi.string().regex(bookshelf.Model.prefixedUuidRegex('BO')),
        author_id: Joi.string().regex(bookshelf.Model.prefixedUuidRegex('AU')).required(),
        title: Joi.string().min(1).max(100).required(),
    },
});
