var express = require('express');
var Level = require('../models/level.js');
var apiResponse = require('../app/apiResponse.js');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.send({
    api: {
      title: "election-threat",
      version: "1.0",
      author: "Alex Hall",
      base_url: "/api/1",
    },
    endpoints: {}
  });
});

/* Level(s) routes */
// Get all
router.get('/levels', function(req, res, next)
{
  Level.find({}, function(err, levels){
    res.send(new apiResponse(levels, req, err));
  });
});

// Get single
router.get('/levels/:name', function(req, res, next)
{
  Level.find({
    name: req.params.name
  }, function(err, levels){
    res.send(new apiResponse(levels.pop(), req, err));
  });
});


module.exports = router;
