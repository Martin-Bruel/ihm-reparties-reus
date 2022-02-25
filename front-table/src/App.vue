<template>
  <div>
    <Map ref="map" @on-move="onMove" :positionNotification="positionNotification"/>
    <Notification v-if="notification == true" @accept-modal="acceptModal" @close-modal="closeModal"/>
  </div>
</template>

<script>
import { latLng } from "leaflet";
import Map from './components/Map.vue'
import Notification from './components/Notification.vue'

export default {
  data(){
    return {
      time: null, 
      message: null, 
      messages: [],
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: [51.505, -0.159],
      markerLatLng: [51.504, -0.159],
      notification: false,
      positionNotification: null,
      result: null
    }
  },  
  name: 'App',
  components: {
    Notification,
    Map,
  },
  methods: {
    closeModal(){
      this.notification = false
    },
    acceptModal(){
      this.positionNotification = latLng(this.result.message.lat,this.result.message.lon)
      this.$refs.map.updateCenterAndZoom(latLng(this.result.message.lat,this.result.message.lon), 15)
      this.notification = false
    },
    onMove(cards, id, event){

      let y = event.detail.event.screenY
      let x = event.detail.event.screenX

      if (y === undefined) y = event.detail.event.changedTouches[0].clientY
      if (x === undefined) x = event.detail.event.changedTouches[0].clientX

      if (y < 80){
        this.sendCard(cards, id, "UP")
        console.log("Envoyé Ecran 1")
      } else if (x < 80){
        this.sendCard(cards, id, "LEFT")
        console.log("Envoyé Ecran 2")
      }
    },
    sendCard(cards, id, orientation){
      console.log(id, orientation);
      console.log(cards)
      cards = cards.filter(card => card.id != id);
      this.connection.send('{"id": '+id+',"orientation": "'+orientation+'"}')
    }
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
      this.notification = true
      this.result = JSON.parse(event.data)
      this.positionNotification = latLng(this.result.message.lat,this.result.message.lon)
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
