const router = require('express').Router();
const controllers = require('../controllers/movies.js');
const validators = require('../middlewares/validator.js');

router.get('/', controllers.getSavedMovies);
router.post('/', validators.saveNewMovie, controllers.saveNewMovie);
router.delete('/:movieId', validators.validateMovieId, controllers.deleteMovie);

module.exports = router;
