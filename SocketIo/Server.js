const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// HTML serve
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use(express.static(__dirname));

// socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

      // username set
    socket.on('setUsername', (username) => {
        socket.username = username;
    });

    // message receive
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', {
            user: socket.username,
            message: msg
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.username);
    });
});

const port = 5000;
server.listen(port, () => {
    console.log(`server is running on ${port}`);
});
