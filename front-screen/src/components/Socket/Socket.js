import Graph from "../Graph";
import axios from 'axios'
import Vue from 'vue'

export default {
  data: () => ({ time: null, connection: null, screenId: null, message: null, cards: [], screenInitialized: false }),
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

      if(ID == 3) {
        document.getElementById("printAddButton").classList.add("visible");
        document.getElementById("printAddButton").classList.remove("hidden");
      }

      Vue.prototype.$screenId = ID
      this.screenId = ID;
      const PORT = "3000";
      const IP = process.env.VUE_APP_BACK_IP;

      this.connection = new WebSocket(`ws://${IP}:${PORT}?id=${ID}`);
      this.connection.onopen = () => {};
      this.connection.onmessage = event => {
        // Vue data binding means you don't need any extra work to
        // update your UI. Just set the `time` and Vue will automatically
        // update the `<h2>`.
        var card = JSON.parse(event.data)
        console.log(card)
        axios.get(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/card/`+card['id']).then(response => {
          let res = response.data
          console.log(res)
          if (this.cards.filter(item => item.id === res.id).length === 0)
            this.cards.push(res)
          else this.$refs.graph.makeHugeCard(res.id, "gold")
        })
        this.time = event.data;
      }

      this.screenInitialized = true;
    },
  }
}
