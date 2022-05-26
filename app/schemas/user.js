const Joi = require('joi');

const schema = Joi.object({

   pseudo: Joi.string().min(1).max(30).required(),
   email: Joi.string().min(0).max(255).required(),
   password: Joi.number.string().min(8).max(255).required()
});
module.exports = schema; 