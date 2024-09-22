const express = require('express');
const router = express.Router();
const users = require('../database/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { user: req.session.user});
});

router.post('/', function(req, res, next) {
    let user = req.body.user;

    if(users[user]) {
        users.comparePass(req.body.pass, users[user].hash, function(err, result) {
            if(result) {
                // Guardamos los datos del usuario en la sesión
                req.session.user = users[user];
                
                // Verificar si el username es 'admin'
                if(user === 'admin') {
                    req.session.user.username = 'admin';  // Marcar el usuario como 'admin'
                }

                req.session.message = "Welcome!";
                res.redirect("/restricted");
            } else {
                req.session.error = "Incorrect user or password";
                res.redirect("/login");
            }
        });
    } else {
        req.session.error = "Incorrect user or password";
        res.redirect("/login");
    }
});

module.exports = router;
