<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Socket/>
    <hr/><br>
    <div v-draggable  v-touch:swipe.left="swipeHandler">
      <Card title="Micheeeel Jackson" subtitle="12 ans - Salvador - Garagiste" flag="france.png" img="jackson1.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
    </div>
    <div v-draggable>
      <Card title="Carloes Jackson" subtitle="57 ans - Salvador - Jardinier" flag="france.png" img="jackson2.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
    </div>
    <div v-draggable>
      <Card title="Pablo Escrobar" subtitle="23 ans - France - Dealer" flag="france.png" img="pablo.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
    </div>
    <div v-draggable>
      <Card title="Clementine" subtitle="27 ans - France - Chiante" flag="france.png" img="clementine.jpg" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut nibh sagittis, vestibulum elit vitae, venenatis justo. Duis vel leo a risus tincidunt tincidunt eu a orci. Pellentesque sagittis maximus nisi a euismod. Phasellus nec velit dui. Fusce fermentum eu leo at elementum. Phasellus vel metus luctus, tincidunt lectus sed, consequat nulla. Suspendisse gravida leo sapien, ac fermentum elit varius sit amet. Fusce ante mi, sagittis at auctor eget, tristique eu tellus. Donec elementum mi blandit tortor feugiat laoreet. Duis aliquam elit velit, at volutpat dolor hendrerit aliquam. Nulla rutrum et ipsum at consequat. Integer lorem sapien, placerat ut ex sed, porta convallis nulla. Nullam porta quis purus non consequat. " />
    </div>

  </div>
</template>

<script>
import Socket from './components/Socket.vue'
import Card from './components/Card.vue'
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
