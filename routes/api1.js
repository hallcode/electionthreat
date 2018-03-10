var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next){
  res.send({
    api: {
      version: "1.0",
      base_url: "/api/1"
    },
    endpoints: {
      "/": "Description of API."
    }
  });
});


module.exports = router;
