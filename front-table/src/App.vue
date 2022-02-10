<template>
  <div id="app">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <div v-if="loading">
        <transition-group name="list" tag="p">
          <div v-for="card in cards" :key="card.id" v-draggable >
              <div v-draggable @stop="onMove(card.id, $event)">
                <Card :title="card.title" :subtitle="card.subtitle" :flag="card.flag" :img="card.img" :content="card.content" />
              </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Socket from './components/Socket.vue'
import Card from './components/Card.vue'
import axios from 'axios'

export default {
  data(){
    return {
      cards: null,
      loading: false,
      time: null, 
      message: null, 
      messages: []
    }
  },  
  name: 'App',
  components: {
    Socket,
    Card
  },
  methods: {
    onMove(id, event){
      if (event.detail.event.screenY < 80){
        this.sendCard(id, "UP")
        console.log("Envoyé Ecran 1")
      } else if (event.detail.event.screenX < 80){
        this.sendCard(id, "LEFT")
        console.log("Envoyé Ecran 2")
      }
    },
    sendCard(id, orientation){
      console.log(id, orientation);
      console.log(this.cards)
      this.cards = this.cards.filter(card => card.id != id);
      console.log(this.cards)
      this.connection.send('{"id": '+id+',"orientation": "'+orientation+'"}')
    }
  },
  
  mounted () {
    axios.get(`http://${process.env.VUE_APP_BACK_IP}:8080/reus-api/cards`).then(response => {
      this.cards = response.data
      this.loading = true
    })
  },

  created: function() {
    const PORT = "3000";
    const ID = "0";
    const IP = process.env.VUE_APP_BACK_IP;

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
</script>

<style>

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #181a1b;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list-card {
    display: inline-block;
  }

.list-enter-active, .list-leave-active {
    transition: all 0.8s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
opacity: 0;
transform: translateY(1000px);
}
</style>
