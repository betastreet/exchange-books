const bookshelf = require('database');
const ModelBase = require('bookshelf-modelbase')(bookshelf);
const Joi = require('validation');

const orderedUuidPrefix = 'BO';

module.exports = ModelBase.extend({
    tableName: 'books',
    orderedUuids: ['id', 'author_id'],
    orderedUuidPrefix,
    softDelete: true,
    validate: {
        id: Joi.pouuid().pouuid(orderedUuidPrefix).required(),
        author_id: Joi.pouuid().pouuid('AU').required(),
        title: Joi.string().min(1).max(100).required(),
    },
}, {
    masks: {
        user: 'id,author_id',
        admin: '*',
    },
});
