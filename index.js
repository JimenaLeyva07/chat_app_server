const express = require('express');

const path = require('path');
require('dotenv').config();

//DB Config
const{ dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Body read and parse
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

// LLamo al archivo socket
require('./sockets/socket.js');

// Path publico
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

// My Route. Middleware => función que se ejecuta cuando el código va pasando x ese lugar
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));



server.listen(process.env.PORT, (err)=>{
    if(err) throw new Error(err);

    console.log(`Servidor corriendo en puerto`, process.env.PORT);
});