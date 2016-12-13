let Joi = require('joi');
Joi = require('joi-prefixed-ordered-uuid')(Joi);

module.exports = Joi;
