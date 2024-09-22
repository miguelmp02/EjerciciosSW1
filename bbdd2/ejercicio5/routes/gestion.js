const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Ruta al archivo games.json
const gamesFile = path.join(__dirname, '../database/games.json');

// Middleware para verificar si el usuario es administrador
function isAdmin(req, res, next) {
    if (req.session.user && req.session.user.username === 'admin') {
        return next();
    }
    return res.status(403).send('Acceso denegado. Solo los administradores pueden acceder.');
}

// Leer juegos desde el archivo JSON
function getGames(callback) {
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, JSON.parse(data));
    });
}

// Escribir juegos en el archivo JSON
function saveGames(games, callback) {
    fs.writeFile(gamesFile, JSON.stringify(games, null, 2), 'utf8', callback);
}

// Ruta principal de Gestión
router.get('/', isAdmin, (req, res) => {
    getGames((err, games) => {
        if (err) {
            return res.status(500).send("Error al cargar los juegos.");
        }
        res.render('gestion', { games: games, user: req.session.user });
    });
});

// Ruta para eliminar un juego
router.post('/delete/:id', isAdmin, (req, res) => {
  const gameId = parseInt(req.params.id);
  getGames((err, games) => {
      if (err) {
          return res.status(500).send("Error al cargar los juegos.");
      }
      const updatedGames = games.filter(game => game.id !== gameId);
      saveGames(updatedGames, (err) => {
          if (err) {
              return res.status(500).send("Error al guardar los cambios.");
          }
          res.redirect('/gestion');
      });
  });
});

// Ruta para agregar un nuevo juego
router.post('/add', isAdmin, (req, res) => {
    const newGame = {
        id: Date.now(),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        foto: req.body.foto,
        plataforma: req.body.plataforma,
        año: parseInt(req.body.año),
        desarrollador: req.body.desarrollador,
        genero: req.body.genero,
        valoracion: parseFloat(req.body.valoracion),
        edad: req.body.edad
    };

    getGames((err, games) => {
        if (err) {
            return res.status(500).send("Error al cargar los juegos.");
        }
        games.push(newGame);
        saveGames(games, (err) => {
            if (err) {
                return res.status(500).send("Error al guardar el nuevo juego.");
            }
            res.redirect('/gestion');
        });
    });
});

// Ruta para editar un juego existente
router.post('/edit/:id', isAdmin, (req, res) => {
    const gameId = parseInt(req.params.id);
    getGames((err, games) => {
        if (err) {
            return res.status(500).send("Error al cargar los juegos.");
        }
        const updatedGames = games.map(game => {
            if (game.id === gameId) {
                return {
                    id: game.id,
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    foto: req.body.foto,
                    plataforma: req.body.plataforma,
                    año: parseInt(req.body.año),
                    desarrollador: req.body.desarrollador,
                    genero: req.body.genero,
                    valoracion: parseFloat(req.body.valoracion),
                    edad: req.body.edad
                };
            }
            return game;
        });

        saveGames(updatedGames, (err) => {
            if (err) {
                return res.status(500).send("Error al guardar los cambios.");
            }
            res.redirect('/gestion');
        });
    });
});

module.exports = router;


