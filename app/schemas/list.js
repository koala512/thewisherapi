const Joi = require('joi');

const schema = Joi.object({

    title: Joi.string().min(1).max(30).required(),
    coment: Joi.string().min(0).max(255).required(),

});

module.exports = schema; 