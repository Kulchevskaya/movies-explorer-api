const mongoose = require('mongoose');
const { NotFound } = require('../errors/index.js');
const Movie = require('../models/movie.js');

const saveNewMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country, director, duration, year, description,
    image, trailer, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send({ movie });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: 'Неверный URL' });
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;

  Movie.findOneAndRemove({ _id: movieId, owner })
    .orFail(new NotFound('В сохранениях нет с таким ID фильма'))
    .then((movie) => {
      res.send({ movie });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(400).send({ message: 'id карточки не верно' });
      }
      next(err);
    });
};

const getSavedMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  saveNewMovie,
  deleteMovie,
  getSavedMovies,
};
