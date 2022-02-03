const { WebSocketServer } = require('ws');


const portWS = 3000;
const wss = new WebSocketServer({ port: portWS }); 

var screens = {};
var table;

console.log('Listening WEB SOCKET on port '+portWS+'!')

wss.on('connection', function connection(ws, req) {
    const data = new URLSearchParams(req.url.replace('/',''));
    if(data.get('id') == 0){

        console.log('Table is connected');
        table = ws;
        ws.on('message', onTableMessage);
    }
    else{
        console.log(`Screen ${data.get('id')} is connected`);
        screens[data.get('id')] = ws;
        ws.on('message', onScreenMessage);
    }
});

function onScreenMessage(data){
    console.log('message recieve : ' + data);
    const json = JSON.parse(data);
    table.send(json.message);
}

function onTableMessage(data){
    console.log('message recieve : ' + data);
    const json = JSON.parse(data);
    screens[json.id].send(json.message)
}