var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var items = ["Elemento 1", "Elemento 2", "Elemento 3"];
  res.render('index', { title: 'My App', items: items });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});
router.get('/images/:nombre', function(req, res, next) {
  const nombreImagen = req.params.nombre;
  res.sendFile(path.join(__dirname, '..', 'public', 'images', nombreImagen));
});
router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    res.redirect('/home');
  } else {
    res.render("/error");
  }
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home' });
});
module.exports = router;
