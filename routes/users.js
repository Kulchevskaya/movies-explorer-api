const router = require('express').Router();
const controllers = require('../controllers/users');
const validators = require('../middlewares/validator.js');

router.get('/me', controllers.getUserInfo);
router.patch('/me', validators.updateProfile, controllers.updateProfile);

module.exports = router;
