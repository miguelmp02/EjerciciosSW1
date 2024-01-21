const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const users = {};

io.on('connection', (socket) => {
  console.log('a user connected');

  // Manejar el evento de inicio de sesión
  socket.on('login', (username) => {
    users[socket.id] = username;
    io.emit('chat message', `[${username}]: Se unió al chat`);
  });

  // Manejar los mensajes del chat
  socket.on('chat message', (msg) => {
    io.emit('chat message', `[${users[socket.id]}]: ${msg}`);
  });

  // Manejar la desconexión del usuario
  socket.on('disconnect', () => {
    io.emit('chat message', `[${users[socket.id]}]: Abandonó el chat`);
    delete users[socket.id];
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
