const router = require('express').Router();
const controllers = require('../controllers/users');
const validators = require('../middlewares/validator.js');

router.post('/signup', validators.register, controllers.createUser);
router.post('/signin', validators.login, controllers.login);

module.exports = router;
