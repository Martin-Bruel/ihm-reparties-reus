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
        screensWS[id] = ws;
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
    tableWS.send(json);
}

/* handle table message */
function onTableMessage(data){
    /* convert message to json */
    const json = JSON.parse(data);
    console.log(`message recieve from table: ${json.orientation}`);
    /* send message to the specific screen */
    if (json.orientation == "UP"){
        if(screensWS[1] !== undefined) screensWS[1].send(JSON.stringify(json))
        else console.log(json.orientation + " is not connected...") 
    } else {
        if(screensWS[2] !== undefined) screensWS[2].send(JSON.stringify(json))
        else console.log(json.orientation + " is not connected...") 
    }
}

function sendMessageToTable(id, message){

    const res = {id:id, message:message};
    tableWS.send(JSON.stringify(res));
}

module.exports = {
    connection,
    sendMessageToTable
}