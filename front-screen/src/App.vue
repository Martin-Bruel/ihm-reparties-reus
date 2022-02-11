<template>
  <div id="app">
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
  color: whitesmoke;
  margin-top: 60px;
}

body {
  overflow: hidden;
}
</style>
