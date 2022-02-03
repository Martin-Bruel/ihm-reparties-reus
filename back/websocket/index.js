var tableWS;
var screensWS = {};

/* handle client connection */
function connection(ws, req) {

    /* resolve client id */
    const id = new URLSearchParams(req.url.replace('/','')).get('id');
    
    /* id 0 is table */
    if(id == 0){

        console.log('Table is connected');
        /* register table websocket */
        tableWS = ws;
        /* define function calling on table message */
        ws.on('message', onTableMessage);
    }
    
    /* other id are screens */
    else{
        console.log(`Screen ${id} is connected`);
        /* register screen websocket */
        screens[id] = ws;
        /* define function calling on screen message */
        ws.on('message', onScreenMessage);
    }
};

/* handle screen message */
function onScreenMessage(data){
    /* convert message to json */
    const json = JSON.parse(data);
    console.log(`message recieve from screen: ${json.message}`);
    /* send message to table */
    table.send(json.message);
}

/* handle table message */
function onTableMessage(data){
    /* convert message to json */
    const json = JSON.parse(data);
    console.log(`message recieve from table: ${json.message}`);
    /* send message to the specific screen */
    screens[json.id].send(json.message)
}

module.exports = {
    connection
}