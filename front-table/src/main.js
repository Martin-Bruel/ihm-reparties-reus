import Vue from 'vue'
import App from './App.vue'
import Vue2TouchEvents from 'vue2-touch-events'
import { DraggableDirective } from '@braks/revue-draggable';
// import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false
Vue.directive('draggable', DraggableDirective)
new Vue({
  render: h => h(App),
}).$mount('#app')
