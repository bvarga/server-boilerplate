var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { assets: { css: '/css/main.css', js: '/js/main.js'}});
});

module.exports = router;
