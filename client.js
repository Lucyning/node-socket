const net = require('net');
const client = net.createConnection({
    host: '127.0.0.1',
    port: 3000
});

client.on('connect', () => {
    // Send data to the server
    client.write('测试是测试');

    setTimeout(() => {
        client.write('JavaScript ');
        client.write('TypeScript ');
        client.write('Python ');
        client.write('Java ');
        client.write('C ');
        client.write('PHP ');
        client.write('ASP.NET ');
    }, 1000);
})

client.on('data', buffer => {
    console.log(buffer.toString());
});

// handle error
client.on('error', err => {
    console.error('server error', err);
});

client.on('close', err => {
    console.log('client closed', err);
});
