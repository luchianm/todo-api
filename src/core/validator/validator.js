const joi = require('joi');

const todoValidation = joi.object({
    title: joi
        .string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),

    project: joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    description: joi
        .string()
        .max(250),

    responsible: joi
        .string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    hoursBooked: joi
        .string()
        .alphanum(),

    createdAt: joi
        .string()
        .required(),

    startedAt: joi
        .string(),

    finishedAt: joi
        .any(),

    state: joi
        .string()
        .required(),

    deleted: joi
        .boolean()
        .required(),

});
