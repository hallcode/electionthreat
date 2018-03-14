var express = require('express');
var router = express.Router();

// Controllers
var ApiController = require('../controllers/ApiController');
var AlertController = require('../controllers/AlertController');
var ElectionController = require('../controllers/ElectionController');
var LevelController = require('../controllers/LevelController');
var PollController = require('../controllers/PollController');
var PostController = require('../controllers/PostController');

/* GET index listing. */
router.get('/', ApiController.base);
router.get('/docs', ApiController.docs);

/* Alert routs. */
router.get('/alerts', AlertController.list);
router.get('/alerts/:election', AlertController.recentFor);
router.post('/alerts', AlertController.create);

/* Elections routes */
router.get('/elections', ElectionController.list);
router.get('/elections/watched', ElectionController.watched);
router.get('/elections/:code', ElectionController.single);
router.post('/elections', ElectionController.create);
router.delete('/elections', ElectionController.delete);

/* Level routes */
router.get('/levels', LevelController.list);
router.get('/levels/:name', LevelController.single);

/* Poll routes */
router.get('/polls', PollController.list);
router.get('/polls/:election', PollController.getFor);
router.post('/polls', PollController.create);

/* Post routes */
router.get('/posts', PostController.list);
router.get('/posts/:year/:slug', PostController.single);
router.post('/posts', PostController.create);
router.delete('/posts/:id');


module.exports = router;
