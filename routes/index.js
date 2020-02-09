var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { page: 'Home', menuId:'home' });
});

router.get('/dicTrans', function(req, res, next) {
  res.render('dicTrans', {page:'Dictionary', menuId:'dictionary'});
});

router.get('/summarizer', function(req, res, next) {
  res.render('summarizer', {page:'Summarizer', menuId:'summarizer'});
});


module.exports = router;
