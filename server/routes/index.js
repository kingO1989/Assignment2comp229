var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',render:'Abdulsaheed' });
});

router.get('/Home', function(req, res, next) {
  res.render('index', { title: 'Home',render:'Abdulsaheed' });
});
router.get('/About', function(req, res, next) {
  res.render('index', { title: 'About',render:'Abdulsaheed' });
});
router.get('/Projects', function(req, res, next) {
  res.render('index', { title: 'Projects',render:'Abdulsaheed' });
});
router.get('/Services', function(req, res, next) {
  res.render('index', { title: 'Services',render:'Abdulsaheed' });
});
router.get('/Contact', function(req, res, next) {
  res.render('index', { title: 'Contact',render:'Abdulsaheed' });
});

module.exports = router;
