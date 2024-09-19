const express = require('express');
const router = express.Router();
const users = require('../users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Registro', user: req.session.user});
});

router.post('/', function(req, res, next) {
    let user = req.body.user; 
    let pass = req.body.pass;

    if (!users[user]) {
        users.register(user, pass, function(){
            req.session.user = users[user];    //logeo al usuario
            console.log("User:\t" + user + "\tsuccessfully registered"); //Comprobacion
            console.log("Pass:\t" + pass + "\tsuccessfully registered");

            req.session.message = 'Usuario Registrado!';
            res.redirect('/restricted');
        });
    } else {
        req.session.error = 'El usuario ya está registrado';
        res.redirect('/login');
    }
});

    
module.exports = router;

