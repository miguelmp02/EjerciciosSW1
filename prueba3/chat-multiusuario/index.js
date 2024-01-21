const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = {};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    console.log('Usuario conectado');
  
    // Manejar inicio de sesión
    socket.on('login', (username, callback) => {
      // Verificar si el nombre de usuario ya está en uso
      const isUsernameTaken = Object.values(users).includes(username);
  
      if (isUsernameTaken) {
        callback({ success: false, message: 'El nombre de usuario ya está en uso.' });
      } else {
        // Asociar el nombre de usuario al socket
        users[socket.id] = username;
        io.emit('chat message', `[${username}] ha entrado al chat.`);
        callback({ success: true, message: 'Inicio de sesión exitoso.' });
      }
    });
    socket.on('chat message', (msg) => {
        const username = users[socket.id] || 'Anónimo';
        io.emit('chat message', `[${username}]: ${msg}`);
      });
    
      // Manejar desconexión del usuario
      socket.on('disconnect', () => {
        const username = users[socket.id] || 'Anónimo';
        io.emit('chat message', `[${username}] ha salido del chat.`);
        delete users[socket.id];
        console.log('Usuario desconectado');
      });
    });

server.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
