const http = require('http')
const server = http.createServer()
const options = {
    cors: {
        origin: '*'
    }
}
const io = require('socket.io')(server, options);
const userList = [];

io.on('connection', socket => {
    const username = socket.handshake.query.username;
    console.log('User connected');
    userList.push({username: username, userid: socket.id});
    const data = userList
    io.emit('new_user', data);

    socket.on('disconnect', () => {
        userList.pop();
        const data = userList;
        io.emit('user_left', data);
    });
});

server.listen(3000, () => {
    console.log('Server listening on PORT 3000');
});