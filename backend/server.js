const http = require('http')
const server = http.createServer()
const options = {
    cors: {
        origin: '*'
    }
}
const io = require('socket.io')(server, options);
let userList = [];

const fetchUserList = () => {
    const socketsList = io.sockets.sockets;
    userList = [];
    socketsList.forEach(socket => {
        userList.push({userid: socket.id, username: socket.data.username})
    });
}

io.on('connection', socket => {
    const username = socket.handshake.query.username;
    socket.data.username = username;
    fetchUserList();
    console.log(`User connected. Total users : ${userList.length}`);
    const data = userList;
    io.emit('new_user', data);

    socket.on('send__message', (toSockId, msg) => {
        // console.log(`Message from ${socket.id} to ${toSockId} : ${msg}`);
        socket.to(toSockId).emit('new__message', socket.data.username, msg);
    });

    socket.on('disconnect', () => {
        fetchUserList();
        console.log(`User disconnected. Total users : ${userList.length}`)
        const data = userList;
        io.emit('user_left', data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on PORT 3000');
});