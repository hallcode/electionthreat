var express = require('express');
var router = express.Router();

// Controllers
var ApiController = require('../controllers/ApiController');
var LevelController = require('../controllers/LevelController');
var ElectionController = require('../controllers/ElectionController');

var Alert = require('../models/alert');
var Election = require('../models/election');

var Poll = require('../models/poll');
var Post = require('../models/post');
var Subscriber = require('../models/subscriber');

/* GET index listing. */
router.get('/', ApiController.base);

/* Level(s) routes */
router.get('/levels', LevelController.list);
router.get('/levels/:name', LevelController.single);

/* Elections(s) routes */
router.get('/elections', ElectionController.list);
router.get('/elections/watched', ElectionController.watched);
router.get('/elections/:code', ElectionController.single);
router.post('/elections', ElectionController.create);
router.delete('/elections', ElectionController.delete);


module.exports = router;
