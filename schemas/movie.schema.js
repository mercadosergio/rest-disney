const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string().min(3);
const image = Joi.string().uri();
const rating = Joi.number().integer();
const category = Joi.string();
const genreId = Joi.number().integer();

const getMovieSchema = Joi.object({
    id: id.required(),
});

const createMovieSchema = Joi.object({
    title: title.required(),
    image: image.required(),
    rating: rating.required(),
    category: category.required(),
    genreId: genreId.required(),
});

const updateMovieSchema = Joi.object({
    title,
    image,
    rating,
    category,
});

const queryMovieSchema = Joi.object({
    title,
    image,
    rating,
    category,
});

module.exports = { getMovieSchema, createMovieSchema, updateMovieSchema };