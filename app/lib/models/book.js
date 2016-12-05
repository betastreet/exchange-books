const bookshelf = require('database');
const ModelBase = require('bookshelf-modelbase')(bookshelf);
const Joi = require('joi');

const orderedUuidPrefix = 'BO';

module.exports = ModelBase.extend({
    tableName: 'books',
    orderedUuids: ['id', 'author_id'],
    orderedUuidPrefix,
    softDelete: true,
    validate: {
        id: Joi.alternatives().try(
            Joi.binary().length(18),
            Joi.string().regex(bookshelf.Model.prefixedUuidRegex(orderedUuidPrefix))
        ),
        author_id: Joi.alternatives().try(
            Joi.binary().length(18),
            Joi.string().regex(bookshelf.Model.prefixedUuidRegex('AU'))
        ).required(),
        title: Joi.string().min(1).max(100).required(),
    },
});
