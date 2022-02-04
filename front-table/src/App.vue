<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <div v-if="loading">
        <div v-for="card in cards" :key="card.id" v-draggable >
          <div v-draggable="draggableValue">
            <Card :callback="sendMessage" :title="card.title" :subtitle="card.subtitle" :flag="card.flag" :img="card.img" :content="card.content" />
          </div>
        </div>
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
      draggableValue: {
        onDragStop: this.onDragStop,
        multiDrag: true
      },
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
    onDragStop: function(positionDiff, absolutePosition, event) {
      // console.log(event.clientX)
      // console.log(event.clientY)

      if (event.clientX < 80){
        console.log("Envoyé Ecran 1")
      } else if (event.clientY < 80){
        console.log("Envoyé Ecran 2")
      }
    },

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
  
  mounted () {
    axios.get('http://192.168.88.136:8080/reus-api/cards').then(response => {
      this.cards = response.data
      this.loading = true
    })
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
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
