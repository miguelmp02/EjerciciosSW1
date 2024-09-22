var express = require('express');
var router = express.Router();
var games = require('../database/games'); // Asegúrate de que la ruta es correcta

router.get('/', (req, res) => {
    games.getGames((err, gamesList) => {
        if (err) {
            return res.status(500).send("Error al cargar los juegos");
        }
        res.render('restricted',  { games: gamesList, user: req.session.user }); // Asegúrate de que siempre pasas un arreglo, incluso si está vacío
    });
});

// Nueva ruta para los detalles de un juego específico
router.get('/game/:id', (req, res) => {
  const gameId = parseInt(req.params.id);
  games.getGames((err, gamesList) => {
      if (err) {
          return res.status(500).send("Error al cargar el juego");
      }
      const game = gamesList.find(g => g.id === gameId);
      if (!game) {
          return res.status(404).send("Juego no encontrado");
      }
      res.render('game', { title: game.nombre, game: game, user: req.session.user });
  });
});

module.exports = router;