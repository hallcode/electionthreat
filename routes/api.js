var express = require('express');
var expressValidator = require('express-validator');
var api = express.Router();

var Limiter = require('express-rate-limiter');
var MemoryStore = require('express-rate-limiter/lib/memoryStore');
var limiter = new Limiter({ db : new MemoryStore() });

api.use(expressValidator());
const { check, validationResult } = require('express-validator/check');

// Controllers
var Auth = require('../controllers/AuthController');
var UserController = require('../controllers/UserController');
var ApiController = require('../controllers/ApiController');
var AlertController = require('../controllers/AlertController');
var ElectionController = require('../controllers/ElectionController');
var LevelController = require('../controllers/LevelController');
var PollController = require('../controllers/PollController');
var PostController = require('../controllers/PostController');
var PageController = require('../controllers/PageController');
var SubscriberController = require('../controllers/SubscriberController');

/* Auth & User Routes */
api.post('/auth', limiter.middleware(limiter), Auth.login);
api.post('/auth/create-mod', UserController.createMod);

/* GET index listing. */
api.get('/', ApiController.base);
api.get('/docs', ApiController.docs);

/* Alert routs. */
api.get('/alerts', AlertController.list);
api.get('/alerts/:election', AlertController.recentFor);
api.post('/alerts', AlertController.create);

/* Elections routes */
api.get('/elections', ElectionController.list);
api.get('/elections/watched', ElectionController.watched);
api.get('/elections/:code', ElectionController.single);

/* Level routes */
api.get('/levels', LevelController.list);
api.get('/levels/:name', LevelController.single);

/* Poll routes */
api.get('/polls', PollController.list);
api.get('/polls/:election', PollController.getFor);
api.post('/polls', PollController.create);

/* Post routes */
api.get('/posts', PostController.list);
api.get('/posts/:year/:slug', PostController.single);
api.post('/posts', PostController.create);
api.delete('/posts/:id', PostController.delete);

/* Static Page Routes */
api.get('/pages', PageController.list);
api.get('/pages/:title', PageController.static);

/* Subscriber routes */
api.post('/subscribe', SubscriberController.subscribe);
api.post('/unsubscribe', SubscriberController.unsubscribe);


module.exports = api;
