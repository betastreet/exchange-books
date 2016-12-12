const Joi = require('joi');
const bookshelf = require('database');

const CustomJoi = Joi.extend({
    base: Joi.any(),
    name: 'pouuid',
    language: {
        pouuid: 'needs to be a prefixed-ordered-uuid prefixed with {{q}}',
    },
    rules: [
        {
            name: 'pouuid',
            params: {
                q: Joi.alternatives([Joi.string().optional()]),
            },
            validate(params, value, state, options) {
                let testingValue = value;

                if (Buffer.isBuffer(value)) {
                    try {
                        testingValue = bookshelf.Model.binaryToPrefixedUuid(value, (params.q ? params.q.length : 0));
                    } catch (err) {
                        return this.createError('pouuid.pouuid', { v: value, q: params.q }, state, options);
                    }
                }

                const regex = bookshelf.Model.prefixedUuidRegex(params.q);

                const isValid = testingValue.match(regex) || false;

                if (!isValid) {
                    return this.createError('pouuid.pouuid', { v: value, q: params.q }, state, options);
                }

                return value;
            },
        },
    ],
});


module.exports = CustomJoi;
