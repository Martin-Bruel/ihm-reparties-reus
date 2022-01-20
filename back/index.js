const express = require('express');
const {WebSocketServer} = require('ws')

CORS_ORIGIN_ALLOW_ALL = true


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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());


app.post('/', (req, res) => {
    console.log("message receive : "+req.body.message);
    res.status(200).json('ok');
    sockets.forEach((s) => s.send(req.body.message));
});
app.listen(portREST, () => console.log('Listening REST API on port '+portREST+'!'))