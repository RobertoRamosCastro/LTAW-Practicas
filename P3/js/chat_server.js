//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');
const fs = require('fs');

const FICHERO_HTML = 'client.html';
const HTML = fs.readFileSync(FICHERO_HTML, 'utf-8');

// Control de número de usuarios
var users = 0;
var dict = [];

const PUERTO = 8080;

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);

//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.redirect('/client.html')
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);

  // Obtengo el nombre de usuario
  socket.on("nickname", (nickname) => {
    console.log('Nombre de usuario: ' + nickname.red)
    welcome_msg = nickname + ' se ha unido al chat!'
    socket.username = nickname;
    dict.push({ name: socket.username, id: socket.id });
    io.emit('server_msg', welcome_msg);
    users += 1;
  });

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    users -= 1;
  });  

  //-- Evento de escribiendo
  socket.on('typing', (data) => {
      io.emit('display', data)
  });  

  //-- Quitar escribiendo
  socket.on('notTyping', (data) => {
    io.emit('hide', data)
  });  
  
//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);