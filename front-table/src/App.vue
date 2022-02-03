<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div style="display: flex;justify-content: center;">
      <Card title="Micheeeel Jackson" subtitle="12 ans - Salvador - Garagiste" flag="france.png" img="jackson1.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
      <Card title="Carloes Jackson" subtitle="12 ans - Salvador - Garagiste" img="jackson2.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
    </div>
  </div>
</template>

<script>
import Socket from './components/Socket.vue'
import Card from './components/Card.vue'

export default {
  name: 'App',
  components: {
    Socket,
    Card
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
