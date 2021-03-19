const jwt = require('jsonwebtoken');

const secretWord = process.env.JWT_SECRET || 'secret password';
const { Forbidden } = require('../errors/index.js');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Нет токена');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, secretWord);
    req.user = user;
  } catch (err) {
    throw new Forbidden('Нет токена');
  }
  next();
};

module.exports = auth;
