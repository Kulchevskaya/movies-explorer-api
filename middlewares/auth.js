const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors/index.js');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Нет токена');
  }
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } catch (err) {
    throw new Forbidden('Нет токена');
  }
  next();
};

module.exports = auth;
