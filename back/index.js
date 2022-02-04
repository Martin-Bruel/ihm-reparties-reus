/* websocket server */
const { WebSocketServer } = require('ws');

const websocket = require('./websocket');

const portWS = 3000;

const wss = new WebSocketServer({ port: portWS }); 
console.log('Listening WEB SOCKET on port '+portWS+'!')
wss.on('connection', websocket.connection);


/* rest server */
const express = require('express');
const api = require('./api');

const app = express();

const portREST = 8080;

/* prevent of cross-origin issue */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* send json data by default */
app.use(express.json());
app.use('/reus-api', api);
app.listen(portREST, () => console.log('Listening REST API on port '+portREST+'!'))