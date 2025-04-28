const http = require ('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello World\n');
});

// Start the server
    server.listen (3000, () => {
        console.log('Server running at http://localhost:3000/');
});