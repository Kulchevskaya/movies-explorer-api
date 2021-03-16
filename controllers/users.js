const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

const secretWord = process.env.JWT_SECRET || 'secret password';
const { NotFound, Conflict, Unauthorized } = require('../errors/index.js');

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new Conflict('Пользователь с таким e-mail уже зарегистрирован');
      }
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name,
          email,
          password: hash,
        }))
        .then((data) => {
          res.send({ _id: data._id, name: data.name, email: data.email });
        })
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            res.status(400).send({ message: 'Неверный email' });
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .orFail(new Unauthorized('Неправильный email или пароль'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((isValid) => {
        if (isValid) {
          return user;
        }
        throw new Unauthorized('Неправильный email или пароль');
      })
      .catch((err) => {
        next(err);
      }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretWord, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound('Нет пользователя с таким id'))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const myId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(myId,
    { name, email },
    { runValidators: true, new: true })
    .orFail(new NotFound('Нет пользователя с таким id'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.CastError) {
        res.status(400).send({ message: 'id пользователя не верно' });
      }
      next(err);
    });
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateProfile,
};
