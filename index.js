const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
app.use(express.static(`${__dirname}`));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('update_grid', (data) => {
        socket.to(data.room).emit('receive_grid', data);
    });

    socket.on('update_bpm', (data) => {
        socket.to(data.room).emit('receive_bpm', data);
    });
});

server.listen(8080, () => {
    console.log("Server is running.");
});