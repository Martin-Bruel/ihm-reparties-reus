const express = require('express');
const {WebSocketServer} = require('ws')

const portWS = 3000
const wss = new WebSocketServer({ port: portWS });

var sockets = [];

console.log('Listening WEB SOCKET on port '+portWS+'!')

wss.on('connection', function connection(ws) {
    console.log("new connection")
    sockets.push(ws);
});


const app = express();
const portREST = 8080
const message = "tada"

app.post('/', (req, res) => {
    res.status(200).json('ok');
    sockets.forEach((s) => s.send(req.data.message));
});
app.listen(portREST, () => console.log('Listening REST API on port '+portREST+'!'))