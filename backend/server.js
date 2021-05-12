const http = require('http')
const server = http.createServer()
const options = {
    cors: {
        origin: '*'
    }
}
const io = require('socket.io')(server, options);

io.on('connection', socket => {
    console.log('User connected');
});

server.listen(3000, () => {
    console.log('Server listening on PORT 3000');
});