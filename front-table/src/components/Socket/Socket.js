export default {
    data: () => ({ time: null, message: null, messages: [] }),
    methods: {
      submit(id){
        const json = {
          id: id,
          message: this.message,
        };
        
        this.connection.send(JSON.stringify(json));
      },

      sendMessage: function(message) {
        console.log(this.connection);
        this.connection.send(message);
      }
    },

    created: function() {
      const PORT = "3000";
      const ID = "0";
      const IP = "192.168.88.136";
  
      this.connection = new WebSocket(`ws://${IP}:${PORT}?id=${ID}`);
      this.connection.onopen = () => {
        
      };
      this.connection.onmessage = (event) => {
        // Vue data binding means you don't need any extra work to
        // update your UI. Just set the `time` and Vue will automatically
        // update the `<h2>`.
        this.messages.push(event.data);
        //this.messages;
      };
    }
}