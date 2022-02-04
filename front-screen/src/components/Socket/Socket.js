import Graph from "../Graph";

export default {
  data: () => ({ time: null, connection: null, screenId: null, message: null }),
  components: {
    Graph
  },
  methods: {
    sendMessage: function(message) {
      console.log(this.connection);
      this.connection.send(message);
    },

    submit(id) {
      const json = {
        id: id,
        message: this.message
      };

      this.connection.send(JSON.stringify(json));
    },

    init: function(ID) {
      this.screenId = ID;
      const PORT = "3000";
      const IP = "192.168.210.136";

      this.connection = new WebSocket(`ws://${IP}:${PORT}?id=${ID}`);
      this.connection.onopen = () => {};
      this.connection.onmessage = event => {
        // Vue data binding means you don't need any extra work to
        // update your UI. Just set the `time` and Vue will automatically
        // update the `<h2>`.
        this.time = event.data;
      }
    },
  }
}
