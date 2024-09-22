const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static('public'));

const getGames = () => {
    return JSON.parse(fs.readFileSync('./database/games.json', 'utf8'));
};

const saveGames = (games) => {
    fs.writeFileSync('./database/games.json', JSON.stringify(games, null, 2));
};

app.get('/', (req, res) => {
    const games = getGames();
    res.render('index', { games });
});

// Resto de rutas de la API...

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
