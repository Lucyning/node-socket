const net = require('net');
const HOST = '127.0.0.1';
const PORT = 3000;

// Create a TCP service instance
const server = net.createServer();

// Listening port
server.listen(PORT, HOST);

server.on('listening', () => {
    console.log(`Service is on ${HOST}:${PORT}`);
});

server.on('connection', socket => {
    // data event is to read data
    socket.on('data', buffer => {

      // toString is to change data to string ,an toLowerCase makes string to lowerCase
        const msg = buffer.toString()
        console.log('server get: ' + msg)

        const returnMsg = msg.toLowerCase();
        // write method to write data and send it back to the client
        socket.write(Buffer.from('server return:' + returnMsg));
    });
})

server.on('close', () => {
    console.log('Server Close!');
});

server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
        console.log('retry..');

        setTimeout(() => {
            server.close();
            server.listen(PORT, HOST);
        }, 1000);
    } else {
        console.error('error', err);
    }
});
