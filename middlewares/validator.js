const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const register = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Имя должно быть не менее 2 знаков',
        'string.mах': 'Имя должно быть не более 30 знаков',
        'any.required': 'Обязательное поле',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Пароль минимум 6 знаков',
      'any.required': 'Обязательное поле',
    }),
  },
});

const login = celebrate({
  body: {
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Пароль минимум 6 знаков',
      'any.required': 'Обязательное поле',
    }),
  },
});

const updateProfile = celebrate({
  body: {
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Имя должно быть не менее 2 знаков',
        'string.mах': 'Имя должно быть не более 30 знаков',
        'any.required': 'Обязательное поле',
      }),
    email: Joi.string().required().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }),
  },
});

const saveNewMovie = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    image: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    trailer: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    thumbnail: Joi.string().required()
      .custom((value, helper) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helper.message('Невалидная ссылка');
      })
      .messages({
        'any.required': 'Обязательное поле',
      }),
    movieId: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Обязательное поле',
      }),
  },
});

const validateMovieId = celebrate({
  params: {
    movieId: Joi.string().required().hex().length(24)
      .messages({
        'any.required': 'Обязательное поле',
        'string.hex': 'Невалидный ID',
        'string.length': 'Невалидный ID',
      }),
  },
});

module.exports = {
  register,
  login,
  updateProfile,
  saveNewMovie,
  validateMovieId,
};
