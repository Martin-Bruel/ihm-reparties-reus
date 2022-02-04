import Graph from "../Graph";

export default {
    data: () => ({ time: null }),
    
    function(){
      let connection = new WebSocket('ws://192.168.54.136:3000/');
      connection.onmessage = (event) => {
        // Vue data binding means you don't need any extra work to
        // update your UI. Just set the `time` and Vue will automatically
        // update the `<h2>`.
        this.time = event.data;
      }
    },
    components: {
      Graph
    },
}