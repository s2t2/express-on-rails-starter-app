var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("VISITED THE HOME PAGE")
  res.redirect('/robots')
});

module.exports = router;
