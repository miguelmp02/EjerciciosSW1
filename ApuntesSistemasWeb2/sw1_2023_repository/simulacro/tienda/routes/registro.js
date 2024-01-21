var express = require('express');
var router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Armazón', user: req.session.user});
});
router.post('/', function(req, res, next){
    let user = req.body.user;
    let pass = req.body.pass;
    if(!users[user]){
        users.register(user, pass, function(){
            req.session.user = users[user];
            req.session.message = 'Usuario Registrado!';
            res.redirect('/restricted');
    });
    } else {
        req.session.error = "Usuario ya registrado";
        res.redirect("/registro");
    }
});


module.exports = router;