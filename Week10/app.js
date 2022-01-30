// require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const socketIO = require('socket.io');

let server = http.createServer(app);
let io = socketIO(server);
let streetLights = [
    { streetName: 'Kristian', green: 9000, red: 12000, yellow: 6000},
    { streetName: 'Kerrigan', green: 13000, red: 18000, yellow: 6000},
    { streetName: 'Info3069', green: 10000, red: 15000, yellow: 5000}
];

app.use(express.static("public"));


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