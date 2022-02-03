<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <div v-if="loading">
        <div v-for="card in cards" :key="card.id">
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

export default {
  name: 'App',
  components: {
    Socket,
    Card
  },
  data(){
    return {
      cards: null,
      loading: false
    }
  },
  mounted () {
    axios.get('http://172.30.156.73:8080/reus-api/cards').then(response => {
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
