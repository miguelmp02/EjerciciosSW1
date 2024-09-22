const fs = require('fs');
const path = require('path');
const gamesFile = path.join(__dirname, '..', 'database', 'games.json'); // Asegúrate de que la ruta al archivo JSON es correcta.

/**
 * Lee los datos de los juegos desde el archivo JSON.
 */
function getGames(callback) {
    fs.readFile(gamesFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the games file:', err);
            return callback([]);
        }
        try {
            const games = JSON.parse(data);
            callback(null, games);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            callback([]);
        }
    });
}

/**
 * Guarda los datos de los juegos en el archivo JSON.
 */
function saveGames(games, callback) {
    const data = JSON.stringify(games, null, 2);
    fs.writeFile(gamesFile, data, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the games file:', err);
            return callback(err);
        }
        callback(null);
    });
}

/**
 * Agrega un nuevo juego al archivo JSON.
 */
function addGame(newGame, callback) {
    getGames((err, games) => {
        if (err) {
            return callback(err);
        }
        games.push(newGame);
        saveGames(games, callback);
    });
}

/**
 * Actualiza un juego existente en el archivo JSON.
 */
function updateGame(id, updatedGame, callback) {
    getGames((err, games) => {
        if (err) {
            return callback(err);
        }
        const index = games.findIndex(game => game.id === id);
        if (index !== -1) {
            games[index] = updatedGame;
            saveGames(games, callback);
        } else {
            callback(new Error('Game not found'));
        }
    });
}

/**
 * Elimina un juego del archivo JSON.
 */
function deleteGame(id, callback) {
    getGames((err, games) => {
        if (err) {
            return callback(err);
        }
        const filteredGames = games.filter(game => game.id !== id);
        saveGames(filteredGames, callback);
    });
}

module.exports = {
    getGames,
    addGame,
    updateGame,
    deleteGame
};
