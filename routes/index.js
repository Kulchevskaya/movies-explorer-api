const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.js');
const userRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const authRouter = require('./auth.js');
const { NotFound } = require('../errors/index.js');

router.use('/', authRouter);
router.use('/users', authMiddleware, userRouter);
router.use('/movies', authMiddleware, moviesRouter);

router.use('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

module.exports = router;
