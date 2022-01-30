require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const socketIO = require('socket.io');

let server = http.createServer(app);
let io = socketIO(server);

app.get('/', (req, res) => res.send('<h1>Hello World From Express</h1>'));

// main socket routine
io.on('connection', (socket) => {
    console.log('new connection established');

    socket.on('join', (dataFromClient) => {
        socket.name = dataFromClient.name;
        // use the room property to create a room
        socket.join(dataFromClient.room);
        console.log(`${socket.name} has joined ${dataFromClient.room}`);

        // send message to all clients in a particular room
        io.to(dataFromClient.room).emit('welcome',
            `Welcome ${socket.name}, currently there are
            ${getNumberOfUsersInRoom(dataFromClient.room)}
            clients in the ${dataFromClient.room} room`);
    })
});

let getNumberOfUsersInRoom = (room) => io.nsps['/'].adapter.rooms[room].length;

server.listen(port, () => console.log(`starting on port ${port}`));