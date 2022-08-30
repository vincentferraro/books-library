const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type/', 'text/plain');
    res.end('Serveur lancé par mes soins')
})

server.listen(port, hostname, ()=>{
    console.log( `Le serveur est connecté à http://${hostname}:${port}/`)
})
