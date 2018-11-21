const Joi = require('joi');

const schemas = {
    '/signin': Joi.object().keys({
        login: Joi.string(),
        password: Joi.string(),
    }),
    '/signup': Joi.object().keys({
        login: Joi.string(),
        password: Joi.string().min(10),
        email:  Joi.string().email().optional(),
        invitedBy: Joi.string().optional(),
        birth: Joi.date().max('01-01-1997'),
        sex: Joi.string().valid(['male', 'female']),
        agreedWithTerms: Joi.boolean().invalid(false)
    }),
    '/drinks': Joi.object().keys({
        name: Joi.string().min(3).max(50),
        strength: Joi.number().precision(2).positive(),
        code: Joi.string().regex(/\w/),
        alcoholic: Joi.any().when('strength', {is: Joi.number().greater(0), then: Joi.boolean().valid(true)})
    }),
    '/recipes': Joi.object().keys({
        name: Joi.string(),
        ingredients: Joi.array().unique('name').min(2).items(Joi.object().keys({
            name: Joi.string(),
            weight: Joi.number().integer().positive(),
            photos: Joi.array().items(Joi.string()).optional()
        })),
        photos: Joi.array().items(Joi.string()).optional(),
        portions: Joi.alternatives().try(Joi.string(), Joi.number().greater(0))
    })
};

exports.check = function (schema, body) {
    if (!schemas[schema])  return {};
    return Joi.validate(body, schemas[schema], { presence: 'required' });
};