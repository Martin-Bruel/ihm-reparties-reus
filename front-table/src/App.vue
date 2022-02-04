<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <div v-if="loading">
        <div v-for="card in cards" :key="card.id" v-draggable  v-touch:swipe.left="swipeHandler">
          <div v-draggable="draggableValue">
            <Card :title="card.title" :subtitle="card.subtitle" :flag="card.flag" :img="card.img" :content="card.content" />
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
        onDragEnd: this.onDragEnd,
        multiDrag: true,
        cards: null
      },
      loading: false,
      cards: null
    }
  },  
  name: 'App',
  components: {
    Socket,
    Card
  },
  methods: {
    onDragEnd: function(positionDiff, absolutePosition, event) {
      // console.log(event.clientX)
      // console.log(event.clientY)

      if (event.clientX < 80){
        console.log("Envoyé Ecran 1")
      } else if (event.clientY < 80){
        console.log("Envoyé Ecran 2")
      }
    }
  },
  mounted () {
    axios.get('http://192.168.88.136:8080/reus-api/cards').then(response => {
      this.cards = response.data
      this.loading = true
    })
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
