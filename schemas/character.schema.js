const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const image = Joi.string().uri();
const age = Joi.number().integer();
const weight = Joi.number().integer();
const history = Joi.string().min(30);

const movies = Joi.number().integer();

const getCharacterSchema = Joi.object({
    id: id.required(),
});

const createCharacterSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    age: age.required(),
    weight: weight.required(),
    history: history.required(),
});

const updateCharacterSchema = Joi.object({
    name,
    image,
    age,
    weight,
    history,
});

const queryCharacterSchema = Joi.object({
    name,
    age,
    movies
});

module.exports = { getCharacterSchema, createCharacterSchema, updateCharacterSchema, queryCharacterSchema };