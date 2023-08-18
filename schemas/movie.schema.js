const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3);
const image = Joi.string().uri();
const rating = Joi.number().integer();
const category = Joi.string();

const getMovieSchema = Joi.object({
    id: id.required(),
});

const createMovieSchema = Joi.object({
    title: title.required(),
    image: image.required(),
    rating: rating.required(),
    category: category.required(),
});

const updateMovieSchema = Joi.object({
    title,
    image,
    rating,
    category,
});

module.exports = { getMovieSchema, createMovieSchema, updateMovieSchema };