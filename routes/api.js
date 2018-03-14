var express = require('express');
var router = express.Router();

// Controllers
var ApiController = require('../controllers/ApiController');
var LevelController = require('../controllers/LevelController');
var ElectionController = require('../controllers/ElectionController');
var AlertController = require('../controllers/AlertController');

/* GET index listing. */
router.get('/', ApiController.base);

/* Alert routs. */
router.get('/alerts', AlertController.list);
router.get('/alerts/:election', AlertController.recentFor);
router.post('/alerts', AlertController.create);

/* Level routes */
router.get('/levels', LevelController.list);
router.get('/levels/:name', LevelController.single);

/* Elections routes */
router.get('/elections', ElectionController.list);
router.get('/elections/watched', ElectionController.watched);
router.get('/elections/:code', ElectionController.single);
router.post('/elections', ElectionController.create);
router.delete('/elections', ElectionController.delete);


module.exports = router;
