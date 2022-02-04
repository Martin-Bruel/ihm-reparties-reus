<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <div v-if="loading">
        <div v-for="card in cards" :key="card.id" v-draggable  v-touch:swipe.left="swipeHandler">
          <Card :title="card.title" :subtitle="card.subtitle" :flag="card.flag" :img="card.img" :content="card.content" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Socket from './components/Socket.vue'
import Card from './components/Card.vue'
import axios from 'axios'
import { Draggable } from 'draggable-vue-directive'

export default {
  directives: {
    Draggable,
  },
  name: 'App',
  components: {
    Socket,
    Card
  },
  methods: {
    swipeHandler(){
      console.log("bisous de nantes")
    }
  },
  data(){
    return {
      cards: null,
      loading: false
    }
  },
  mounted () {
    axios.get('http://localhost:8080/reus-api/cards').then(response => {
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
