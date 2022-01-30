require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const socketIO = require('socket.io');

let server = http.createServer(app);
let io = socketIO(server);
let streetLights = [
    { streetName: 'Maple', green: 12000, red: 7500, yellow: 3000},
    { streetName: 'Oak', green: 15000, red: 6000, yellow: 5000},
    { streetName: 'Main', green: 18000, red: 4500, yellow: 10000}
];

app.get('/', (req, res) => res.send('<h1>Hello World From Express</h1>'));

// main socket routine
io.on('connection', (socket) => {
    console.log('new connection established');

    socket.on('join', (dataFromClient) => {
        socket.street = dataFromClient.street;
        // use the room property to create a room
        socket.join(dataFromClient.street);

        // send message to all clients in a particular room
        io.to(dataFromClient.street).emit('turnLampOn',
            streetLights.find(light => light.streetName === socket.street));
    })
});

server.listen(port, () => console.log(`starting on port ${port}`));