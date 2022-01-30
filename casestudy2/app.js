// library modules
require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 5150;
let app = express();


// Enable reverse proxy support in Express. This causes the
// the "X-Forwarded-Proto" header field to be trusted so its
// value can be used to determine the protocol. See
// http://expressjs.com/api#app-settings for more details.
app.enable('trust proxy');
// Add a handler to inspect the req.secure flag (see
// http://expressjs.com/api#req.secure). This allows us
// to know whether the request was via http or https.
app.use(function (req, res, next) {
    if (req.secure) {
// request was via https, so do no special handling
        next();
    } else {
// request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.use(express.static('public'));

const http = require('http');
let server = http.createServer(app);
const io = require('socket.io')(server, {wsEngine: 'ws'})

const moment = require('moment');
const matColors = require('./matdesigncolorsJSON.json');
const ADMIN_COLOR = "#2F4F4F";

let users = [];
let rooms = ["Default"];

let checkIfNameTaken = (name) => {

    for (let i = 0; i < users.length; i++) {
        if(users[i].name === name){
            return true;
        }
    }

    return false;
};

let checkIfRoomTaken = (name) => {

    for (let i = 0; i < rooms.length; i++) {
        if(rooms[i] === name){
            return true;
        }
    }

    return false;
};

let bubbleColor = () => {

    let coloridx = Math.floor(Math.random() * matColors.colors.length ) + 1;
    return matColors.colors[coloridx];
};

let findUser = (name) => {

    for(let i = 0; i < users.length; ++i){
        if(users[i].name === name){
            return users[i];
        }
    }
};
let createMessage = (name, room, message, color, id, time) => {
    return {
        from: name,
        room: room,
        text: message,
        color: color,
        id: id,
        createdAt: time
    };
};

// client connection here
io.on('connection', (socket) => {

    io.emit('currentRooms', rooms);
    io.emit('currentUsers', users);

    // client sent server 'join' message using room to join
    socket.on('join', (clientData) => {
        console.log(`data from new client --> name: ${clientData.chatName} room: ${clientData.roomName}`);

        if(!checkIfRoomTaken(clientData.roomName)){
            rooms.push(clientData.roomName);
        }

        if(!checkIfNameTaken(clientData.chatName)){
            let user = {
                name: clientData.chatName,
                room: clientData.roomName,
                color: bubbleColor(),
                id: socket.id,
                createdAt: moment().format('h:mm:ss a')
            };

            users.push(user);

            io.to(socket.id).emit('welcome', createMessage("Admin", clientData.roomName, "Welcome " + clientData.chatName, ADMIN_COLOR, null, moment().format('h:mm:ss a')));

            socket.broadcast.to(clientData.roomName).emit("joined", createMessage("Admin", clientData.roomName, clientData.chatName + " has joined the chat.", ADMIN_COLOR, null, moment().format('h:mm:ss a')));
            socket.join(clientData.roomName);

            io.emit('currentRooms', rooms);
            io.emit('currentUsers', users);

        }else{
            io.to(socket.id).emit('nameExists', {}); // sends to the individual client
            console.log("Name is in use.");
        }
    });

    socket.on('typing', (clientData) => {
        socket.broadcast.to(clientData.roomName).emit('typing', clientData.chatName);
    });

    socket.on('createMessage', (clientData) => {
        let user = findUser(clientData.from);

        io.to(clientData.room).emit('sendMessage', createMessage(user.name, user.room, clientData.text, user.color, user.id, moment(). format('h:mm:ss a')));
    });

    socket.on('disconnect', () => {
        let index = -1;
        for(let i = 0; i < users.length; ++i){
            if(users[i].id === socket.id){
                index = i;
                break;
            }
        }

        if(index === -1){
            console.log("Cannot find disconnecting user");
            return;
        }

        let user = users[index];

        console.log(user.name + " has left the chat");

        socket.broadcast.to(user.room).emit("userDisconnected", createMessage(
            "Admin",
            user.room,
            user.name  + " has left the chat",
            ADMIN_COLOR,
            null,
            moment().format('h:mm:ss a')
        ));

        users.splice(index,1);

        //update the connected clients and existing rooms on all clients
        io.emit('currentRooms', rooms);
        io.emit('currentUsers', users)
    });
});


// home page
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'})
});

server.listen(port, () => {
    console.log(`starting on port ${port}`)
});