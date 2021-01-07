const http = require('http');
const port = 3002;
const express = require('express');
const os = require('os');
const app = express();

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    let greet = `Hello from my node.js server yep`;
    res.end(greet);
});

server.listen(port, () => {
    console.log(`Server listen on port: ${port}`);
})

app.get('/gifts', (req, res) => {
    if (req.method === 'GET') {
        res.writeHead(300, {
            'Content-Type': 'Application/Json'
        });
    }

    res.write('greeetings');
    res.end();
})