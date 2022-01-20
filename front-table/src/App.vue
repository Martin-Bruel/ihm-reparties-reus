<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
  </div>
</template>

<script>
import Socket from './components/Socket.vue'

export default {
  name: 'App',
  components: {
    Socket
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
